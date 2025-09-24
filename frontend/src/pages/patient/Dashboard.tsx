import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Link } from "react-router-dom";
function Dashboard() {
    return (
      <>
        <Header />
        <div className="bg-slate-50 min-h-screen py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-extrabold text-slate-800 text-center mb-12">
              Patient Dashboard
            </h1>

            <section id="profile" className="mb-12">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Profile Section
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 bg-cyan-200 rounded-full flex items-center justify-center text-cyan-700 font-bold text-2xl">
                        JD
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-700">
                        John Doe
                      </h3>
                      <p className="text-slate-500">john.doe@example.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="self-diagnosis" className="mb-12">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Self-Diagnosis
                </h2>
                <p className="text-slate-600 mb-6">
                  Use our AI Doctor to get a preliminary diagnosis. Please note
                  this is not a substitute for professional medical advice.
                </p>
                <Link
                  to="/diagnostic"
                  className="bg-cyan-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-cyan-700 transition-transform transform hover:-translate-y-1"
                >
                  Self Diagnose Now
                </Link>
              </div>
            </section>

            <section id="appointments" className="mb-12">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Appointments
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">
                      Book New Appointment
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Easily schedule a new appointment with a healthcare
                      professional.
                    </p>
                    <Link
                      to="/book-appointment"
                      className="bg-cyan-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-cyan-700 transition-transform transform hover:-translate-y-1"
                    >
                      Book Now
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">
                      My Appointments
                    </h3>
                    <ul className="space-y-4">
                      <li className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="font-medium text-slate-800">
                          Dr. Jane Smith - General Practitioner
                        </p>
                        <p className="text-sm text-slate-500">
                          October 26, 2025 at 11:00 AM
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section id="medications" className="mb-12">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Medications
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">
                      Order New Medication
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Access our pharmacy section to manage and order your
                      medications.
                    </p>
                    <Link
                      to="/pharmacy"
                      className="bg-cyan-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-cyan-700 transition-transform transform hover:-translate-y-1"
                    >
                      Go to Pharmacy
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">
                      Medication History
                    </h3>
                    <ul className="space-y-4">
                      <li className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="font-medium text-slate-800">
                          Paracetamol (500mg)
                        </p>
                        <p className="text-sm text-slate-500">
                          Prescribed by Dr. Smith - October 24, 2025
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section id="medical-records" className="mb-12">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Medical Records & Timeline
                </h2>
                <p className="text-slate-600 mb-6">
                  View your complete health history, including diagnoses,
                  appointments, and medications.
                </p>
                <div className="relative">
                  <div className="border-l-4 border-cyan-600 pl-6 space-y-8">
                    <div className="relative">
                      <div className="absolute w-4 h-4 bg-cyan-600 rounded-full -left-8 top-1"></div>
                      <p className="font-semibold text-slate-700">
                        October 24, 2025 - Initial Diagnosis
                      </p>
                      <p className="text-slate-600">
                        AI-powered diagnosis suggests possible Malaria.
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute w-4 h-4 bg-cyan-600 rounded-full -left-8 top-1"></div>
                      <p className="font-semibold text-slate-700">
                        October 26, 2025 - Appointment
                      </p>
                      <p className="text-slate-600">
                        Consultation with Dr. Jane Smith.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </>
    );
}

export default Dashboard;