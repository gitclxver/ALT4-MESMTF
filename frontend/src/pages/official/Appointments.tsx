import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useState, useMemo } from "react";
import { CheckIcon, XIcon, CalendarIcon, ClockIcon } from "../../utils/icons";

interface AppointmentRequest {
  id: number;
  patientName: string;
  age: number;
  requestedDate: string;
  requestedTime: string;
  reason: string;
  avatarUrl: string;
}
interface ConfirmedAppointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  status: "Upcoming" | "Past";
}

const initialAppointmentRequests: AppointmentRequest[] = [
  {
    id: 101,
    patientName: "Alice Johnson",
    age: 28,
    requestedDate: "2025-09-25",
    requestedTime: "11:00 AM",
    reason: "Follow-up consultation for Malaria treatment.",
    avatarUrl: "https://placehold.co/100x100/fecaca/7f1d1d?text=AJ",
  },
  {
    id: 102,
    patientName: "David Smith",
    age: 45,
    requestedDate: "2025-09-26",
    requestedTime: "02:00 PM",
    reason: "Persistent fever and headache.",
    avatarUrl: "https://placehold.co/100x100/bae6fd/0c4a6e?text=DS",
  },
];

const initialConfirmedAppointments: ConfirmedAppointment[] = [
  {
    id: 201,
    patientName: "Michael Brown",
    date: "2025-09-22",
    time: "09:00 AM",
    status: "Past",
  },
  {
    id: 202,
    patientName: "Sarah Miller",
    date: "2025-09-23",
    time: "01:00 PM",
    status: "Past",
  },
  {
    id: 203,
    patientName: "John Doe",
    date: "2025-09-25",
    time: "09:00 AM",
    status: "Upcoming",
  },
  {
    id: 204,
    patientName: "Emily Carter",
    date: "2025-09-26",
    time: "10:00 AM",
    status: "Upcoming",
  },
  {
    id: 205,
    patientName: "Chris Green",
    date: "2025-09-29",
    time: "03:00 PM",
    status: "Upcoming",
  },
];

function Appointments() {

    const [requests, setRequests] = useState<AppointmentRequest[]>(
      initialAppointmentRequests
    );
    const [appointments, setAppointments] = useState<ConfirmedAppointment[]>(
      initialConfirmedAppointments
    );

    const today = useMemo(() => new Date("2025-09-24T00:00:00"), []);

    const { upcomingAppointments, pastAppointments } = useMemo(() => {
      const upcoming = appointments
        .filter((app) => new Date(app.date) >= today)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      const past = appointments
        .filter((app) => new Date(app.date) < today)
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      return { upcomingAppointments: upcoming, pastAppointments: past };
    }, [appointments, today]);

    const handleAccept = (requestId: number) => {
      const request = requests.find((r) => r.id === requestId);
      if (!request) return;

      const newAppointment: ConfirmedAppointment = {
        id: Date.now(),
        patientName: request.patientName,
        date: request.requestedDate,
        time: request.requestedTime,
        status: "Upcoming",
      };

      setAppointments((prev) => [...prev, newAppointment]);
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
    };

    const handleDecline = (requestId: number) => {
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
    };


    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-6 lg:p-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content: Appointment Management */}
              <main className="col-span-1 lg:col-span-2 space-y-8">
                <section id="pending-requests">
                  <h1 className="text-3xl font-extrabold text-slate-800 pb-2 mb-4">
                    Pending Appointment Requests
                  </h1>
                  <div className="space-y-4">
                    {requests.length > 0 ? (
                      requests.map((req) => (
                        <div
                          key={req.id}
                          className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-amber-400"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                            <img
                              src={req.avatarUrl}
                              alt={req.patientName}
                              className="h-16 w-16 rounded-full object-cover mb-4 sm:mb-0"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-slate-800">
                                {req.patientName}, {req.age}
                              </h3>
                              <p className="text-sm text-slate-600 font-semibold">
                                {req.requestedDate} at {req.requestedTime}
                              </p>
                              <p className="text-sm text-slate-500 mt-1">
                                Reason: {req.reason}
                              </p>
                            </div>
                            <div className="flex gap-3 mt-4 sm:mt-0">
                              <button
                                onClick={() => handleAccept(req.id)}
                                className="flex items-center justify-center bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition"
                              >
                                <CheckIcon /> Accept
                              </button>
                              <button
                                onClick={() => handleDecline(req.id)}
                                className="flex items-center justify-center bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition"
                              >
                                <XIcon /> Decline
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-10 bg-white rounded-xl shadow-md">
                        <p className="text-slate-500 font-semibold">
                          No new appointment requests.
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              </main>

              {/* Right Sidebar: Schedule */}
              <aside className="col-span-1 lg:col-span-1 space-y-6">
                <div className="sticky top-8">
                  <h2 className="text-2xl font-bold text-slate-800 pb-2 mb-4">
                    My Schedule
                  </h2>
                  <div className="bg-white rounded-xl shadow-lg p-5">
                    <h3 className="font-bold text-lg text-slate-700 mb-3">
                      Upcoming
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                      {upcomingAppointments.length > 0 ? (
                        upcomingAppointments.map((app) => (
                          <div
                            key={app.id}
                            className="bg-blue-50 border border-blue-200 p-3 rounded-lg"
                          >
                            <p className="font-bold text-blue-800">
                              {app.patientName}
                            </p>
                            <div className="flex items-center mt-1 text-sm text-blue-900">
                              <CalendarIcon /> {app.date}
                            </div>
                            <div className="flex items-center mt-1 text-sm text-blue-900">
                              <ClockIcon /> {app.time}
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
                  <div className="bg-white rounded-xl shadow-lg p-5 mt-6">
                    <h3 className="font-bold text-lg text-slate-700 mb-3">
                      Past
                    </h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                      {pastAppointments.length > 0 ? (
                        pastAppointments.map((app) => (
                          <div
                            key={app.id}
                            className="bg-slate-100 p-3 rounded-lg opacity-75"
                          >
                            <p className="font-bold text-slate-600">
                              {app.patientName}
                            </p>
                            <div className="flex items-center mt-1 text-sm text-slate-500">
                              <CalendarIcon /> {app.date}
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
              </aside>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}

export default Appointments;