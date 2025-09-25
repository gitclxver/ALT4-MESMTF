import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useState, useMemo, useEffect } from "react";
import DoctorCard from "../../components/cards/DoctorCard";
import type { Doctor } from "../../components/cards/DoctorCard";
import type { Appointment } from "../../components/cards/DoctorCard";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "../../utils/icons";

const parseTime = (timeStr: string): number => {
  const lower = timeStr.toLowerCase();
  let hour = parseInt(lower.replace(/am|pm/g, "").trim());
  if (lower.includes("pm") && hour !== 12) hour += 12;
  if (lower.includes("am") && hour === 12) hour = 0;
  return hour;
};

const generateSchedule = (
  workingHours: string
): { [date: string]: string[] } => {
  const schedule: { [date: string]: string[] } = {};
  const [startTimeStr, endTimeStr] = workingHours.split(" - ");
  const startHour = parseTime(startTimeStr);
  const endHour = parseTime(endTimeStr);

  const today = new Date("2025-09-24T00:00:00");
  const daysToGenerate = 45;

  for (let i = 0; i < daysToGenerate; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dateString = currentDate.toISOString().split("T")[0];
      const timeSlots: string[] = [];
      for (let h = startHour; h < endHour; h++) {
        const slotDate = new Date();
        slotDate.setHours(h, 0, 0, 0);
        timeSlots.push(
          slotDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
        );
      }
      if (timeSlots.length > 0) {
        schedule[dateString] = timeSlots;
      }
    }
  }
  return schedule;
};

const initialDoctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Emily Carter",
    specialty: "Cardiologist",
    hospital: "Windhoek Central Hospital",
    workingHours: "9am - 3pm",
    satisfactionRate: 98,
    avatarUrl: "",
    schedule: {},
  },
  {
    id: 2,
    name: "Dr. Ben Hanson",
    specialty: "Neurologist",
    hospital: "Lady Pohamba Private Hospital",
    workingHours: "10am - 6pm",
    satisfactionRate: 95,
    avatarUrl: "",
    schedule: {},
  },
  {
    id: 3,
    name: "Dr. Olivia Chen",
    specialty: "General Practitioner",
    hospital: "Rhino Park Private Hospital",
    workingHours: "8am - 4pm",
    satisfactionRate: 99,
    avatarUrl: "",
    schedule: {},
  },
].map((doctor) => ({
  ...doctor,
  schedule: generateSchedule(doctor.workingHours),
}));

const initialAppointments: Appointment[] = [
  {
    id: 1,
    doctorName: "Dr. Sarah Jenkins",
    specialty: "Dermatologist",
    date: "2025-09-15",
    time: "10:00 AM",
    status: "Past",
  },
];

const CalendarView: React.FC<{
  availableDates: string[];
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
}> = ({ availableDates, onDateSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(
    new Date("2025-09-24T00:00:00")
  );

  const changeMonth = (amount: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = Array.from(
      { length: firstDayOfMonth },
      () => null
    );
    for (let day = 1; day <= totalDays; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  }, [currentDate]);

  const dayIsAvailable = (day: Date | null) => {
    if (!day) return false;
    const dateString = day.toISOString().split("T")[0];
    return availableDates.includes(dateString);
  };

  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 rounded-full hover:bg-slate-200"
        >
          <ChevronLeftIcon />
        </button>
        <h3 className="font-bold text-lg text-slate-700">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 rounded-full hover:bg-slate-200"
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d} className="font-semibold text-slate-500">
            {d}
          </div>
        ))}
        {daysInMonth.map((day, index) => {
          const isAvailable = dayIsAvailable(day);
          const dateString = day ? day.toISOString().split("T")[0] : "";
          const isSelected = selectedDate === dateString;
          let buttonClass =
            "w-9 h-9 flex items-center justify-center rounded-full";
          if (isAvailable) {
            buttonClass += isSelected
              ? " bg-cyan-600 text-white"
              : " bg-cyan-100 text-cyan-800 hover:bg-cyan-200 cursor-pointer";
          } else {
            buttonClass += " text-slate-300";
          }
          return (
            <div key={index} className="py-1">
              {day && (
                <button
                  onClick={() => isAvailable && onDateSelect(dateString)}
                  disabled={!isAvailable}
                  className={buttonClass}
                >
                  {day.getDate()}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

function Book() {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctorsData);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(
    doctors[0]
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);

  useEffect(() => {
    if (selectedDoctor) {
      const updatedDoctorInList = doctors.find(
        (d) => d.id === selectedDoctor.id
      );
      setSelectedDoctor(updatedDoctorInList || null);
    }
  }, [doctors, selectedDoctor]);

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleBooking = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;

    const newAppointment: Appointment = {
      id: appointments.length + 2,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: selectedDate,
      time: selectedTime,
      status: "Upcoming",
    };
    setAppointments((prev) =>
      [...prev, newAppointment].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    );

    setDoctors((prevDoctors) =>
      prevDoctors.map((doc) => {
        if (doc.id === selectedDoctor.id) {
          const newSchedule = { ...doc.schedule };
          newSchedule[selectedDate] = newSchedule[selectedDate].filter(
            (time) => time !== selectedTime
          );
          if (newSchedule[selectedDate].length === 0) {
            delete newSchedule[selectedDate];
          }
          return { ...doc, schedule: newSchedule };
        }
        return doc;
      })
    );

    setSelectedTime(null);
  };

  const upcomingAppointments = appointments.filter(
    (a) => a.status === "Upcoming"
  );
  const pastAppointments = appointments.filter((a) => a.status === "Past");
  const availableDates = selectedDoctor
    ? Object.keys(selectedDoctor.schedule)
    : [];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 lg:col-span-1 space-y-4">
              <h1 className="text-3xl font-extrabold text-slate-800 pb-2 border-b-2">
                Our Specialists
              </h1>
              {doctors.map((doc) => (
                <DoctorCard
                  key={doc.id}
                  doctor={doc}
                  onSelect={handleSelectDoctor}
                  isSelected={selectedDoctor?.id === doc.id}
                />
              ))}
            </div>

            <div className="col-span-1 lg:col-span-1">
              {selectedDoctor ? (
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Book with {selectedDoctor.name}
                  </h2>
                  <p className="text-md text-slate-500 mb-6">
                    Select a date and time for your appointment.
                  </p>

                  <CalendarView
                    availableDates={availableDates}
                    onDateSelect={setSelectedDate}
                    selectedDate={selectedDate}
                  />

                  {selectedDate && (
                    <div className="mt-6">
                      <label className="font-semibold text-slate-600">
                        Available Times for{" "}
                        {new Date(
                          selectedDate + "T00:00:00"
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                        })}
                      </label>
                      <div className="grid grid-cols-3 gap-2 mt-2 mb-6">
                        {selectedDoctor.schedule[selectedDate]?.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-2 rounded-lg text-sm font-semibold transition-colors ${
                              selectedTime === time
                                ? "bg-cyan-600 text-white"
                                : "bg-slate-100 hover:bg-slate-200"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={handleBooking}
                        disabled={!selectedTime}
                        className="w-full bg-cyan-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-cyan-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full bg-slate-100 rounded-xl p-8 text-center sticky top-8">
                  <p className="text-slate-500 font-semibold text-lg">
                    Select a doctor to see their schedule
                  </p>
                </div>
              )}
            </div>

            <div className="col-span-1 lg:col-span-1 space-y-6">
              <h1 className="text-3xl font-extrabold text-slate-800 pb-2 border-b-2">
                My Appointments
              </h1>
              <div className="bg-white rounded-xl shadow-md p-5">
                <h3 className="font-bold text-lg text-slate-700 mb-3">
                  Upcoming
                </h3>
                <div className="space-y-3">
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map((app) => (
                      <div
                        key={app.id}
                        className="bg-cyan-50 border border-cyan-200 p-3 rounded-lg"
                      >
                        <p className="font-bold text-cyan-800">
                          {app.doctorName}
                        </p>
                        <p className="text-sm text-cyan-700">{app.specialty}</p>
                        <div className="flex items-center mt-2 text-sm text-cyan-900">
                          <CalendarIcon /> {app.date} at {app.time}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-sm">
                      No upcoming appointments.
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-5">
                <h3 className="font-bold text-lg text-slate-700 mb-3">Past</h3>
                <div className="space-y-3">
                  {pastAppointments.length > 0 ? (
                    pastAppointments.map((app) => (
                      <div key={app.id} className="bg-slate-100 p-3 rounded-lg">
                        <p className="font-bold text-slate-600">
                          {app.doctorName}
                        </p>
                        <p className="text-sm text-slate-500">
                          {app.specialty}
                        </p>
                        <div className="flex items-center mt-2 text-sm text-slate-500">
                          <CalendarIcon /> {app.date} at {app.time}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-sm">
                      No past appointments.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Book;
