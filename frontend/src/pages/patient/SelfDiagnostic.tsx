import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useState } from "react";
import { Link } from "react-router-dom";

const symptoms = [
  {
    category: "Very Strong Signs",
    symptoms: [
      { name: "Abdominal Pain", diseases: ["Typhoid", "Malaria"], severity: 4 },
      { name: "Vomiting", diseases: ["Malaria"], severity: 4 },
      { name: "Sore Throat", diseases: ["Malaria"], severity: 4 },
      { name: "Stomach Issues", diseases: ["Typhoid"], severity: 4 },
    ],
  },
  {
    catergory: "Strong Signs",
    symptoms: [
      { name: "Headache", diseases: ["Typhoid", "Malaria"], severity: 3 },
      { name: "Fatigue", diseases: ["Malaria"], severity: 3 },
      { name: "Cough", diseases: ["Malaria"], severity: 3 },
      { name: " Constipation", diseases: ["Typhoid"], severity: 3 },
      { name: "Persistent High Fever", diseases: ["Malaria"], severity: 3 },
    ],
  },
  {
    category: "Weak Signs",
    symptoms: [
      { name: "Chest pain", diseases: ["Malaria"], severity: 2 },
      { name: "Back pain", diseases: ["Malaria"], severity: 2 },
      { name: "Muscle Pain", diseases: ["Malaria"], severity: 2 },
      { name: "Weakness", diseases: ["Typhoid"], severity: 2 },
      { name: "Tiredness", diseases: ["Typhoid"], severity: 2 },
    ],
  },
  {
    category: "Very Weak Signs",
    symptoms: [
      { name: "Diarrhea", diseases: ["Malaria"], severity: 1 },
      { name: "Sweating", diseases: ["Malaria"], severity: 1 },
      { name: "Rash", diseases: ["Malaria", "Typhoid"], severity: 1 },
      {
        name: "Loss of appetite",
        diseases: ["Malaria", "Typhoid"],
        severity: 1,
      },
    ],
  },
];

const allSymptoms = symptoms.flatMap((group) => group.symptoms);

const BrainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 text-cyan-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 01-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 013.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 013.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 01-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.455-2.455l-1.197-.398 1.197-.398a3.375 3.375 0 002.455-2.455l.398-1.197.398 1.197a3.375 3.375 0 002.455 2.455l1.197.398-1.197.398a3.375 3.375 0 00-2.455 2.455z"
    />
  </svg>
);

const StethoscopeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.472 19.262l-1.24-.93a.5.5 0 010-.814l3.14-2.355a.5.5 0 01.63 0l1.24.93a.5.5 0 010 .814l-3.14 2.355a.5.5 0 01-.63 0zM12 21a9 9 0 100-18 9 9 0 000 18z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4v.01M12 8v4m0 4v.01"
    />
  </svg>
);

function SelfDiagnostic() {
  const [diagnosisState, setDiagnosisState] = useState("idle");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [otherSymptoms, setOtherSymptoms] = useState("");
  const [diagnosisResult, setDiagnosisResult] = useState({
    diagnosis: "",
    confidence: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSymptomToggle = (symptomName: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomName)
        ? prev.filter((name) => name !== symptomName)
        : [...prev, symptomName]
    );
  };

  const handleStartDiagnosis = () => {
    if (selectedSymptoms.length === 0 && otherSymptoms.trim() === "") {
      setErrorMessage("Please select or enter at least one symptom.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setErrorMessage("");
    setDiagnosisState("diagnosing");

    let malariaScore = 0;
    let typhoidScore = 0;

    selectedSymptoms.forEach((symptomName) => {
      const symptom = allSymptoms.find((s) => s.name === symptomName);
      if (symptom) {
        if (symptom.diseases.includes("Malaria")) {
          malariaScore += symptom.severity;
        }
        if (symptom.diseases.includes("Typhoid")) {
          typhoidScore += symptom.severity;
        }
      }
    });

    const HIGH_CONFIDENCE_THRESHOLD = 8;
    const MEDIUM_CONFIDENCE_THRESHOLD = 5;
    let result = { diagnosis: "Inconclusive", confidence: "Low" };

    if (
      malariaScore >= HIGH_CONFIDENCE_THRESHOLD &&
      typhoidScore >= HIGH_CONFIDENCE_THRESHOLD
    ) {
      result = {
        diagnosis: "High Probability of Malaria & Typhoid",
        confidence: "Very High",
      };
    } else if (malariaScore >= HIGH_CONFIDENCE_THRESHOLD) {
      result = { diagnosis: "High Probability of Malaria", confidence: "High" };
    } else if (typhoidScore >= HIGH_CONFIDENCE_THRESHOLD) {
      result = {
        diagnosis: "High Probability of Typhoid Fever",
        confidence: "High",
      };
    } else if (
      malariaScore >= MEDIUM_CONFIDENCE_THRESHOLD &&
      typhoidScore >= MEDIUM_CONFIDENCE_THRESHOLD
    ) {
      result = {
        diagnosis: "Possible Malaria & Typhoid Co-infection",
        confidence: "Medium",
      };
    } else if (malariaScore >= MEDIUM_CONFIDENCE_THRESHOLD) {
      result = { diagnosis: "Possible Malaria", confidence: "Medium" };
    } else if (typhoidScore >= MEDIUM_CONFIDENCE_THRESHOLD) {
      result = { diagnosis: "Possible Typhoid Fever", confidence: "Medium" };
    } else if (malariaScore > 0 || typhoidScore > 0) {
      result = {
        diagnosis: "Symptoms match minor criteria",
        confidence: "Low",
      };
    }

    setDiagnosisResult(result);

    setTimeout(() => {
      setDiagnosisState("complete");
    }, 4000);
  };

  const handleReset = () => {
    setDiagnosisState("idle");
    setSelectedSymptoms([]);
    setOtherSymptoms("");
    setDiagnosisResult({ diagnosis: "", confidence: "" });
  };
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          {(diagnosisState === "idle" || diagnosisState === "diagnosing") && (
            <section id="ai-doctor" className="transition-opacity duration-500">
              <div
                className={`max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl ${
                  diagnosisState === "diagnosing" ? "animate-pulse" : ""
                }`}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    <BrainIcon />
                  </div>
                  <h1 className="text-4xl font-extrabold text-slate-800">
                    AI Health Diagnosis
                  </h1>
                </div>

                {diagnosisState === "idle" && (
                  <>
                    <p className="mt-4 text-lg text-slate-600 text-center">
                      Please select all the symptoms you are currently
                      experiencing from the list below.
                    </p>
                    <div className="mt-8 border-t border-b border-slate-200 py-6">
                      <h3 className="text-lg font-bold text-slate-700 mb-4">
                        Common Symptoms
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {allSymptoms.map((symptom) => (
                          <button
                            key={symptom.name}
                            onClick={() => handleSymptomToggle(symptom.name)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm md:text-base ${
                              selectedSymptoms.includes(symptom.name)
                                ? "bg-cyan-600 text-white shadow-md"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {symptom.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6">
                      <label
                        htmlFor="other-symptoms"
                        className="text-lg font-bold text-slate-700 mb-2 block"
                      >
                        Other Symptoms (Optional)
                      </label>
                      <p className="text-sm text-slate-500 mb-3">
                        If you have other symptoms not listed above, please
                        describe them here.
                      </p>
                      <textarea
                        id="other-symptoms"
                        value={otherSymptoms}
                        onChange={(e) => setOtherSymptoms(e.target.value)}
                        rows={4}
                        className="w-full resize-none max-h-[150px] p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                        placeholder="e.g., Nausea, chills, joint pain..."
                      ></textarea>
                    </div>
                    <div className="text-center mt-10">
                      <button
                        onClick={handleStartDiagnosis}
                        disabled={
                          selectedSymptoms.length === 0 &&
                          otherSymptoms.trim() === ""
                        }
                        className="bg-cyan-600 text-white font-semibold py-3 px-12 rounded-lg shadow-lg hover:bg-cyan-700 transition-all transform hover:-translate-y-1 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        Diagnose Now
                      </button>
                      {errorMessage && (
                        <p className="text-red-500 text-sm mt-4">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {diagnosisState === "diagnosing" && (
                  <p className="mt-4 text-lg text-cyan-700 font-medium text-center">
                    Analyzing your symptoms... Please wait.
                  </p>
                )}
              </div>
            </section>
          )}

          <div
            className={`transition-opacity duration-1000 ${
              diagnosisState === "complete"
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {diagnosisState === "complete" && (
              <div className="space-y-8">
                <section
                  id="results"
                  className="bg-white p-8 rounded-2xl shadow-xl"
                >
                  <h2 className="text-3xl font-bold text-slate-800 border-b pb-4 mb-4">
                    Diagnostic Results
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        PRELIMINARY DIAGNOSIS
                      </p>
                      <p
                        className={`text-2xl font-bold ${
                          diagnosisResult.confidence === "High" ||
                          diagnosisResult.confidence === "Very High"
                            ? "text-red-600"
                            : "text-orange-500"
                        }`}
                      >
                        {diagnosisResult.diagnosis}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        CONFIDENCE SCORE
                      </p>
                      <p className="text-2xl font-bold text-slate-700">
                        {diagnosisResult.confidence}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-600">
                    This is a preliminary result based on our AI analysis and
                    should be confirmed by a medical professional. Please see
                    the recommended next steps below.
                  </p>
                </section>

                <section
                  id="treatment-plan"
                  className="bg-white p-8 rounded-2xl shadow-xl"
                >
                  <h2 className="text-3xl font-bold text-slate-800 border-b pb-4 mb-4">
                    Recommended Next Steps
                  </h2>
                  <ul className="list-disc list-inside space-y-3 text-slate-700">
                    <li>
                      <span className="font-semibold">
                        Immediate Consultation:
                      </span>{" "}
                      It is highly recommended to book an appointment with a
                      doctor within 24 hours.
                    </li>
                    <li>
                      <span className="font-semibold">Rest & Hydration:</span>{" "}
                      Rest as much as possible and drink plenty of fluids
                      (water, oral rehydration salts).
                    </li>
                    <li>
                      <span className="font-semibold">
                        Avoid Self-Medication:
                      </span>{" "}
                      Do not take any unprescribed medication before consulting
                      a doctor.
                    </li>
                  </ul>
                </section>

                <section
                  id="doctor-consultation"
                  className="text-center bg-cyan-700 p-10 rounded-2xl shadow-xl"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-cyan-600 p-4 rounded-full">
                      <StethoscopeIcon />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    Confirm Your Diagnosis
                  </h2>
                  <p className="text-cyan-100 mt-2 max-w-xl mx-auto">
                    Your health is our Priority. Schedule a Consultation Now to
                    get a precise Diagnosis and a Personalized Treatment Plan
                    from a Certified Doctor.
                  </p>
                  <Link
                    to="/book-appointment"
                    className="inline-block mt-6 bg-white text-cyan-700 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-slate-100 transition-transform transform hover:-translate-y-1"
                  >
                    Book an Appointment
                  </Link>
                </section>

                <div className="text-center pt-8">
                  <button
                    onClick={handleReset}
                    className="bg-slate-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-slate-800 transition-colors"
                  >
                    Perform Another Diagnostic
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SelfDiagnostic;
