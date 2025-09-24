import React from "react";

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  workingHours: string;
  satisfactionRate: number;
  avatarUrl?: string;
  schedule: { [date: string]: string[] };
}

export interface Appointment {
  id: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: "Upcoming" | "Past";
}

const StarIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2 text-slate-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: (doctor: Doctor) => void;
  isSelected: boolean;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onSelect,
  isSelected,
}) => {
  const {
    name,
    specialty,
    hospital,
    workingHours,
    satisfactionRate,
    avatarUrl,
  } = doctor;
  return (
    <div
      onClick={() => onSelect(doctor)}
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer ${
        isSelected
          ? "ring-4 ring-cyan-500 shadow-2xl"
          : "hover:shadow-xl hover:-translate-y-1"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <img
            className="h-20 w-20 rounded-full object-cover ring-4 ring-cyan-500/30"
            src={
              avatarUrl ||
              `https://placehold.co/100x100/E2E8F0/475569?text=${name.charAt(
                0
              )}`
            }
            alt={`Dr. ${name}`}
          />
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold text-slate-800">{name}</h2>
            <p className="text-md font-medium text-cyan-600">{specialty}</p>
            <p className="text-sm text-slate-500">{hospital}</p>
          </div>
        </div>
        <hr className="my-5 border-t border-slate-200" />
        <div className="space-y-4 text-slate-700">
          <div className="flex items-center">
            <ClockIcon />
            <div>
              <p className="text-sm font-semibold text-slate-500">
                Working Hours
              </p>
              <p className="font-medium">{workingHours}</p>
            </div>
          </div>
          <div>
            <StarIcon className="h-5 w-5 inline-block text-yellow-400 mr-1" />
            <p className="text-sm font-semibold text-slate-500 mb-2">
              Satisfaction Rate
            </p>
            <div className="flex items-center">
              <div className="w-full bg-slate-200 rounded-full h-2.5 mr-3">
                <div
                  className="bg-gradient-to-r from-teal-400 to-cyan-500 h-2.5 rounded-full"
                  style={{ width: `${satisfactionRate}%` }}
                ></div>
              </div>
              <span className="text-lg font-bold text-cyan-600">
                {satisfactionRate}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
