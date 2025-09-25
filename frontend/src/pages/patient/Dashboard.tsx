import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { ClipboardListIcon, PillIcon, CalendarIcon } from "../../utils/icons";
import { Link } from "react-router-dom";
function Dashboard() {
    return (
      <>
        <Header />
        <div className="bg-slate-50 min-h-screen py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-extrabold text-slate-800 text-center mb-6">
              Welcome Back, John
            </h1>
            <p className="text-center text-slate-500 text-lg mb-12">
              Your central hub for managing your health and wellness.
            </p>

            {/* Quick Actions Section */}
            <section id="quick-actions" className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  to="/book-appointment"
                  className="block text-center bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  <CalendarIcon />
                  <h3 className="font-bold text-xl text-slate-800">
                    Appointments
                  </h3>
                  <p className="text-sm text-slate-500">
                    Book and view your upcoming visits.
                  </p>
                </Link>
                <Link
                  to="/patient-record"
                  className="block text-center bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  <ClipboardListIcon />
                  <h3 className="font-bold text-xl text-slate-800">
                    My Records
                  </h3>
                  <p className="text-sm text-slate-500">
                    Access your complete health history.
                  </p>
                </Link>
                <Link
                  to="/pharmacy"
                  className="block text-center bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  <PillIcon />
                  <h3 className="font-bold text-xl text-slate-800">Pharmacy</h3>
                  <p className="text-sm text-slate-500">
                    Order and manage your medications.
                  </p>
                </Link>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column */}
              <div className="lg:col-span-2">
                <section id="appointments-summary" className="mb-12">
                  <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">
                      Upcoming Appointment
                    </h2>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="font-medium text-slate-800 text-lg">
                        Dr. Olivia Chen - General Practitioner
                      </p>
                      <p className="text-md text-slate-500">
                        October 26, 2025 at 11:00 AM
                      </p>
                      <p className="text-sm text-slate-500 mt-2">
                        Reason: Follow-up Consultation
                      </p>
                      <Link
                        to="/book-appointment"
                        className="mt-4 inline-block bg-cyan-600 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-cyan-700 transition-colors"
                      >
                        Manage Appointments
                      </Link>
                    </div>
                  </div>
                </section>

                <section id="self-diagnosis">
                  <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">
                        AI Self-Diagnosis
                      </h2>
                      <p className="text-slate-600 mt-1 max-w-lg">
                        Get a preliminary analysis of your symptoms. This is not
                        a substitute for professional medical advice.
                      </p>
                    </div>
                    <Link
                      to="/diagnostic"
                      className="flex-shrink-0 ml-4 bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-cyan-700 transition-transform transform hover:-translate-y-1"
                    >
                      Start Diagnosis
                    </Link>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div>
                <section id="profile" className="mb-12">
                  <div className="bg-white rounded-xl shadow-lg p-6">
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
                        <p className="text-slate-500">Patient ID: P001</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="recent-activity">
                  <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">
                      Recent Activity
                    </h2>
                    <div className="relative border-l-2 border-cyan-200 pl-6 space-y-8">
                      <div className="relative">
                        <div className="absolute w-4 h-4 bg-cyan-600 rounded-full -left-[35px] top-1 border-4 border-white"></div>
                        <p className="font-semibold text-slate-700">
                          Appointment Booked
                        </p>
                        <p className="text-sm text-slate-500">
                          With Dr. Olivia Chen for Oct 26
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute w-4 h-4 bg-cyan-600 rounded-full -left-[35px] top-1 border-4 border-white"></div>
                        <p className="font-semibold text-slate-700">
                          Medication Ordered
                        </p>
                        <p className="text-sm text-slate-500">
                          Paracetamol (500mg)
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute w-4 h-4 bg-cyan-600 rounded-full -left-[35px] top-1 border-4 border-white"></div>
                        <p className="font-semibold text-slate-700">
                          AI Diagnosis Ran
                        </p>
                        <p className="text-sm text-slate-500">
                          Result: Low risk of Malaria
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}

export default Dashboard;