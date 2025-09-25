import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useState, useMemo } from "react";
import { PlusIcon, CheckCircleIcon, ClipboardListIcon, PillIcon, StethoscopeIcon, BrainIcon } from "../../utils/icons";

interface Patient {
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  contact: string;
  emergencyContact: string;
  allergies: string[];
  chronicConditions: string[];
  avatarUrl: string;
}
interface MedicalRecord {
  id: number;
  type: "AI_DIAGNOSIS" | "DOCTOR_DIAGNOSIS" | "PRESCRIPTION" | "PHARMACY";
  date: string;
  title: string;
  details: string;
  doctor?: string;
  status?: "Completed" | "In Progress";
}
interface TreatmentTask {
  id: number;
  text: string;
  completed: boolean;
}
interface TreatmentPlan {
  id: number;
  startDate: string;
  status: "Active" | "Completed";
  tasks: TreatmentTask[];
  completionDate?: string;
}

const patientData: Patient = {
  name: "John Doe",
  age: 34,
  gender: "Male",
  bloodType: "O+",
  contact: "john.doe@email.com | 081-123-4567",
  emergencyContact: "Jane Doe (Spouse) | 081-765-4321",
  allergies: ["Penicillin"],
  chronicConditions: ["Asthma"],
  avatarUrl: "https://placehold.co/128x128/E2E8F0/475569?text=JD",
};
const medicalRecordsData: MedicalRecord[] = [
  {
    id: 1,
    type: "DOCTOR_DIAGNOSIS",
    date: "2025-09-18",
    title: "Confirmed Typhoid Fever",
    details: "Widal test positive. Started on Ciprofloxacin.",
    doctor: "Dr. E. Carter",
    status: "Completed",
  },
  {
    id: 2,
    type: "AI_DIAGNOSIS",
    date: "2025-09-16",
    title: "High Probability of Typhoid Fever",
    details: "Symptoms: High fever, headache, weakness.",
    doctor: "AI System",
  },
  {
    id: 3,
    type: "PRESCRIPTION",
    date: "2025-09-18",
    title: "Ciprofloxacin 500mg",
    details: "1 tablet twice daily for 14 days.",
    doctor: "Dr. E. Carter",
  },
  {
    id: 4,
    type: "PHARMACY",
    date: "2025-09-18",
    title: "Ciprofloxacin Purchase",
    details: "Transaction ID: 789123 at Rhino Park Pharmacy.",
  },
  {
    id: 5,
    type: "DOCTOR_DIAGNOSIS",
    date: "2024-05-22",
    title: "Malaria (P. falciparum)",
    details: "Positive rapid diagnostic test.",
    doctor: "Dr. O. Chen",
    status: "Completed",
  },
];
const initialTreatmentPlan: TreatmentPlan = {
  id: 1,
  startDate: "2025-09-18",
  status: "Active",
  tasks: [
    { id: 1, text: "Take Ciprofloxacin 500mg every 12 hours", completed: true },
    { id: 2, text: "Drink at least 3 liters of water daily", completed: true },
    { id: 3, text: "Monitor temperature twice daily", completed: false },
    {
      id: 4,
      text: "Follow-up appointment with Dr. Carter in 1 week",
      completed: false,
    },
  ],
};
const recordIcons = {
  AI_DIAGNOSIS: <BrainIcon />,
  DOCTOR_DIAGNOSIS: <StethoscopeIcon />,
  PRESCRIPTION: <PillIcon />,
  PHARMACY: <ClipboardListIcon />,
};


function Profile() {

    const [activeTab, setActiveTab] = useState("diagnoses");
    const [treatmentPlan, setTreatmentPlan] =
      useState<TreatmentPlan>(initialTreatmentPlan);
    const [newTask, setNewTask] = useState("");

    const progress = useMemo(() => {
      const completedTasks = treatmentPlan.tasks.filter(
        (t) => t.completed
      ).length;
      const totalTasks = treatmentPlan.tasks.length;
      return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    }, [treatmentPlan]);

    const handleToggleTask = (taskId: number) => {
      if (treatmentPlan.status === "Completed") return;
      setTreatmentPlan((plan) => ({
        ...plan,
        tasks: plan.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
      }));
    };

    const handleAddTask = () => {
      if (newTask.trim() === "" || treatmentPlan.status === "Completed") return;
      const newTreatmentTask: TreatmentTask = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      setTreatmentPlan((plan) => ({
        ...plan,
        tasks: [...plan.tasks, newTreatmentTask],
      }));
      setNewTask("");
    };

    const handleCompletePlan = () => {
      setTreatmentPlan((plan) => ({
        ...plan,
        status: "Completed",
        completionDate: new Date().toISOString().split("T")[0],
      }));
    };

    const handleStartNewPlan = () => {
      setTreatmentPlan({
        id: Date.now(),
        startDate: new Date().toISOString().split("T")[0],
        status: "Active",
        tasks: [],
      });
    };

    const filteredRecords = (types: MedicalRecord["type"][]) =>
      medicalRecordsData.filter((record) => types.includes(record.type));


    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-6 lg:p-8">
          <div className="container mx-auto space-y-8">
            <section
              id="profile"
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
                <img
                  src={patientData.avatarUrl}
                  alt="Patient Avatar"
                  className="h-32 w-32 rounded-full ring-4 ring-cyan-500/50 object-cover"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-4xl font-extrabold text-slate-800">
                    {patientData.name}
                  </h1>
                  <p className="text-lg text-slate-500">
                    {patientData.age} years old • {patientData.gender} • Blood
                    Type: {patientData.bloodType}
                  </p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    <div>
                      <strong className="text-slate-600">Allergies:</strong>{" "}
                      {patientData.allergies.join(", ")}
                    </div>
                    <div>
                      <strong className="text-slate-600">
                        Chronic Conditions:
                      </strong>{" "}
                      {patientData.chronicConditions.join(", ")}
                    </div>
                    <div>
                      <strong className="text-slate-600">Contact:</strong>{" "}
                      {patientData.contact}
                    </div>
                    <div>
                      <strong className="text-slate-600">Emergency:</strong>{" "}
                      {patientData.emergencyContact}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="medical-records"
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-6">
                Medical Records
              </h2>
              <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-6">
                  <button
                    onClick={() => setActiveTab("diagnoses")}
                    className={`py-3 px-1 border-b-2 font-semibold text-sm ${
                      activeTab === "diagnoses"
                        ? "border-cyan-500 text-cyan-600"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    Diagnoses
                  </button>
                  <button
                    onClick={() => setActiveTab("prescriptions")}
                    className={`py-3 px-1 border-b-2 font-semibold text-sm ${
                      activeTab === "prescriptions"
                        ? "border-cyan-500 text-cyan-600"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    Prescriptions & Pharmacy
                  </button>
                </nav>
              </div>
              <div className="mt-6 space-y-4">
                {activeTab === "diagnoses" &&
                  filteredRecords(["DOCTOR_DIAGNOSIS", "AI_DIAGNOSIS"]).map(
                    (rec) => (
                      <div
                        key={rec.id}
                        className="flex items-start space-x-4 p-4 rounded-lg bg-slate-50 border border-slate-200"
                      >
                        <div
                          className={`p-2 rounded-full ${
                            rec.type === "AI_DIAGNOSIS"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {recordIcons[rec.type]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-700">
                            {rec.title}{" "}
                            <span className="text-xs font-medium text-slate-400 ml-2">
                              {rec.date}
                            </span>
                          </p>
                          <p className="text-sm text-slate-600">
                            {rec.details}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Provider: {rec.doctor}
                          </p>
                        </div>
                        {rec.status && (
                          <span
                            className={`ml-auto text-xs font-bold px-2 py-1 rounded-full ${
                              rec.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {rec.status}
                          </span>
                        )}
                      </div>
                    )
                  )}
                {activeTab === "prescriptions" &&
                  filteredRecords(["PRESCRIPTION", "PHARMACY"]).map((rec) => (
                    <div
                      key={rec.id}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-slate-50 border border-slate-200"
                    >
                      <div
                        className={`p-2 rounded-full ${
                          rec.type === "PRESCRIPTION"
                            ? "bg-teal-100 text-teal-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {recordIcons[rec.type]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-700">
                          {rec.title}{" "}
                          <span className="text-xs font-medium text-slate-400 ml-2">
                            {rec.date}
                          </span>
                        </p>
                        <p className="text-sm text-slate-600">{rec.details}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            <section
              id="treatment-plan"
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-slate-800">
                  Current Treatment Plan
                </h2>
                <span
                  className={`text-sm font-bold px-3 py-1 rounded-full ${
                    treatmentPlan.status === "Active"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {treatmentPlan.status}
                </span>
              </div>

              {treatmentPlan.status === "Active" ? (
                <>
                  <div className="space-y-4">
                    {treatmentPlan.tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => handleToggleTask(task.id)}
                        className="flex items-center p-4 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors"
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                            task.completed
                              ? "bg-cyan-600 border-cyan-600"
                              : "border-slate-300"
                          }`}
                        >
                          {task.completed && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`ml-4 text-slate-700 ${
                            task.completed ? "line-through text-slate-400" : ""
                          }`}
                        >
                          {task.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-slate-600">
                        Progress
                      </label>
                      <span className="text-sm font-bold text-cyan-600">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div
                        className="bg-cyan-500 h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="Add a new task..."
                      className="flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    />
                    <button
                      onClick={handleAddTask}
                      className="flex items-center justify-center bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-cyan-700 transition"
                    >
                      <PlusIcon />{" "}
                      <span className="ml-2 hidden sm:inline">Add</span>
                    </button>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={handleCompletePlan}
                      disabled={progress < 100}
                      className="w-full flex items-center justify-center bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                      <CheckCircleIcon /> Complete Treatment Plan
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-lg">
                  <p className="text-green-600 font-bold">
                    Plan completed on {treatmentPlan.completionDate}!
                  </p>
                  <p className="text-slate-500 mt-2">
                    A new treatment plan can be initiated by your doctor.
                  </p>
                  <button
                    onClick={handleStartNewPlan}
                    className="mt-6 bg-cyan-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-cyan-700 transition"
                  >
                    Start New Plan
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
        <Footer />
      </>
    );
}

export default Profile;