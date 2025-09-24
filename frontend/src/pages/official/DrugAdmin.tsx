import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useState } from "react";
import { CheckCircleIcon, PillIcon, UserIcon } from "../../utils/icons";  

interface Patient {
  id: string;
  name: string;
  age: number;
}
interface AdministrationRecord {
  id: number;
  patientName: string;
  drugName: string;
  dosage: string;
  administeredBy: string;
  timestamp: Date;
}

const myPatients: Patient[] = [
  { id: "p1", name: "John Doe", age: 34 },
  { id: "p2", name: "Alice Johnson", age: 28 },
  { id: "p3", name: "Michael Brown", age: 52 },
];
const drugList: string[] = [
  "Artemether-lumefantrine",
  "Quinine",
  "Doxycycline",
  "Ciprofloxacin",
  "Azithromycin",
  "Ceftriaxone",
  "Paracetamol",
];
const initialAdministrationLog: AdministrationRecord[] = [
  {
    id: 1,
    patientName: "Sarah Miller",
    drugName: "Paracetamol",
    dosage: "500mg",
    administeredBy: "Dr. O. Chen",
    timestamp: new Date("2025-09-23T13:05:00Z"),
  },
  {
    id: 2,
    patientName: "Michael Brown",
    drugName: "Quinine",
    dosage: "300mg",
    administeredBy: "Dr. O. Chen",
    timestamp: new Date("2025-09-22T09:15:00Z"),
  },
];

function DrugAdmin() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );
  const [selectedDrug, setSelectedDrug] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [administrationLog, setAdministrationLog] = useState<
    AdministrationRecord[]
  >(initialAdministrationLog);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAdministerDrug = () => {
    if (
      !selectedPatientId ||
      !selectedDrug ||
      !dosage ||
      !frequency ||
      !duration
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const patient = myPatients.find((p) => p.id === selectedPatientId);
    if (!patient) return;

    const newRecord: AdministrationRecord = {
      id: Date.now(),
      patientName: patient.name,
      drugName: selectedDrug,
      dosage: `${dosage} | ${frequency} | ${duration}`,
      administeredBy: "Dr. O. Chen", // Hardcoded for demo
      timestamp: new Date(),
    };

    setAdministrationLog((prev) => [newRecord, ...prev]);

    setSelectedPatientId(null);
    setSelectedDrug("");
    setDosage("");
    setFrequency("");
    setDuration("");
    setNotes("");

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const isFormValid =
    selectedPatientId && selectedDrug && dosage && frequency && duration;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content: Administration Form */}
            <main className="col-span-1 lg:col-span-2 space-y-8">
              <section id="administration-form">
                <h1 className="text-3xl font-extrabold text-slate-800 pb-2 mb-4">
                  Administer Medication
                </h1>
                <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                  {showSuccess && (
                    <div className="flex items-center p-4 bg-green-50 text-green-800 border border-green-200 rounded-lg">
                      <CheckCircleIcon />
                      <p className="font-semibold">
                        Drug successfully administered and recorded.
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="font-semibold text-slate-600 mb-2 block">
                      Select Patient
                    </label>
                    <div className="relative">
                      <UserIcon />
                      <select
                        value={selectedPatientId || ""}
                        onChange={(e) => setSelectedPatientId(e.target.value)}
                        className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      >
                        <option value="" disabled>
                          -- Choose a patient --
                        </option>
                        {myPatients.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} (Age: {p.age})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-600 mb-2 block">
                      Select Drug
                    </label>
                    <select
                      value={selectedDrug}
                      onChange={(e) => setSelectedDrug(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    >
                      <option value="" disabled>
                        -- Choose a medication --
                      </option>
                      {drugList.map((drug) => (
                        <option key={drug} value={drug}>
                          {drug}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-semibold text-slate-600 mb-2 block">
                        Dosage
                      </label>
                      <input
                        type="text"
                        value={dosage}
                        onChange={(e) => setDosage(e.target.value)}
                        placeholder="e.g., 500mg"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 mb-2 block">
                        Frequency
                      </label>
                      <input
                        type="text"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        placeholder="e.g., Twice a day"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 mb-2 block">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g., 14 days"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-600 mb-2 block">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      placeholder="e.g., Take with food."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    ></textarea>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <button
                      onClick={handleAdministerDrug}
                      disabled={!isFormValid}
                      className="w-full flex items-center justify-center bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-cyan-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                      <PillIcon /> Administer Drug
                    </button>
                  </div>
                </div>
              </section>
            </main>

            {/* Right Sidebar: Administration Log */}
            <aside className="col-span-1 lg:col-span-1">
              <div className="sticky top-8">
                <h2 className="text-2xl font-bold text-slate-800 pb-2 mb-4">
                  Administration Log
                </h2>
                <div className="bg-white rounded-xl shadow-lg p-5">
                  <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    {administrationLog.length > 0 ? (
                      administrationLog.map((rec) => (
                        <div
                          key={rec.id}
                          className="bg-slate-50 p-4 rounded-lg border border-slate-200"
                        >
                          <p className="font-bold text-slate-700">
                            {rec.drugName}
                          </p>
                          <p className="text-sm text-slate-600">
                            to{" "}
                            <span className="font-semibold">
                              {rec.patientName}
                            </span>
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {rec.dosage}
                          </p>
                          <p className="text-xs text-slate-400 mt-2 text-right">
                            {rec.timestamp.toLocaleString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-500 text-sm text-center py-4">
                        No administration records found.
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

export default DrugAdmin;
