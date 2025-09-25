import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import type { Patient } from "../../components/cards/PatientCard";
import PatientCard from "../../components/cards/PatientCard";


const myPatientsData: Patient[] = [
  {
    patientId: "P001",
    name: "John Doe",
    age: 34,
    bloodType: "O+",
    lastDiagnosis: "Confirmed Typhoid Fever",
    doctor: "Dr. Olivia Chen",
    avatarUrl: "https://placehold.co/100x100/E2E8F0/475569?text=JD",
  },
  {
    patientId: "P002",
    name: "Alice Johnson",
    age: 28,
    bloodType: "A-",
    lastDiagnosis: "Follow-up for Malaria treatment",
    doctor: "Dr. Olivia Chen",
    avatarUrl: "https://placehold.co/100x100/fecaca/7f1d1d?text=AJ",
  },
  {
    patientId: "P003",
    name: "Michael Brown",
    age: 52,
    bloodType: "B+",
    lastDiagnosis: "Routine Check-up",
    doctor: "Dr. Olivia Chen",
    avatarUrl: "https://placehold.co/100x100/a7f3d0/166534?text=MB",
  },
  {
    patientId: "P004",
    name: "Sarah Miller",
    age: 41,
    bloodType: "AB+",
    lastDiagnosis: "Asthma Management",
    doctor: "Dr. Olivia Chen",
    avatarUrl: "https://placehold.co/100x100/bae6fd/0c4a6e?text=SM",
  },
  {
    patientId: "P005",
    name: "David Smith",
    age: 45,
    bloodType: "O-",
    lastDiagnosis: "Pending diagnosis for persistent fever",
    doctor: "Dr. Olivia Chen",
    avatarUrl: "https://placehold.co/100x100/fef08a/854d0e?text=DS",
  },
];

function MyPatients() {
    const handlePatientClick = (patientId: string) => {
    console.log(`Navigating to profile for patient ${patientId}`);
    // Implement navigation logic here, e.g., using react-router's useNavigate
    };
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-slate-800">
              My Patients
            </h1>
            <p className="mt-2 text-lg text-slate-600">
              Select a patient to view their detailed medical profile and manage
              their treatment plan.
            </p>
          </div>

          {/* Responsive Grid for Patient Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {myPatientsData.map((patient) => (
              <div
                key={patient.patientId}
                onClick={() => handlePatientClick(patient.patientId)}
              >
                <PatientCard patient={patient} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyPatients;
