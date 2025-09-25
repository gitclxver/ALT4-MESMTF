import { DoctorIcon, BloodDropIcon, BirthdayIcon, IdCardIcon, StethoscopeIcon } from "../../utils/icons";

export interface Patient {
  patientId: string;
  name: string;
  age: number;
  bloodType: string;
  lastDiagnosis: string;
  doctor: string;
  avatarUrl?: string;
}

interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const { patientId, name, age, bloodType, lastDiagnosis,doctor, avatarUrl } = patient;

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full max-w-md font-sans">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <img
              className="h-16 w-16 rounded-full object-cover ring-4 ring-cyan-500/20"
              src={
                avatarUrl ||
                `https://placehold.co/100x100/E2E8F0/475569?text=${name.charAt(
                  0
                )}`
              }
              alt={`Photo of ${name}`}
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-800">{name}</h2>
              <div className="flex items-center text-sm text-slate-500">
                <IdCardIcon />
                <span className="ml-1.5">ID: {patientId}</span>
              </div>
              <div className="flex items-center text-sm text-slate-500 mt-1">
                <DoctorIcon />
                <span className="ml-1.5">Attending: {doctor}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 text-center border-t border-b border-slate-200 py-4">
            <div className="flex flex-col items-center">
              <BirthdayIcon />
              <p className="text-xs text-slate-500 mt-1">Age</p>
              <p className="font-semibold text-slate-700">{age} years</p>
            </div>
            <div className="flex flex-col items-center">
              <BloodDropIcon />
              <p className="text-xs text-slate-500 mt-1">Blood Type</p>
              <p className="font-bold text-lg text-red-600">{bloodType}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold text-slate-500 mb-2">
              Last Diagnosis
            </p>
            <div className="flex items-start bg-slate-50 p-3 rounded-lg">
              <StethoscopeIcon />
              <p className="font-medium text-slate-700 leading-snug">
                {lastDiagnosis}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientCard;
