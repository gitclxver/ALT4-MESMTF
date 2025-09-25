import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Link } from "react-router-dom";
import { CalendarIcon, UserIcon, PillIcon } from "../../utils/icons";

function Dashboard() {
  return (
    <>
      <Header />
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-slate-800 text-center mb-6">
            Welcome Back, Dr. Smith
          </h1>
          <p className="text-center text-slate-500 text-lg mb-12">
            Here's a summary of your activities today.
          </p>

          <section id="quick-actions" className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/appointments"
                className="block text-center bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <CalendarIcon />
                <h3 className="font-bold text-xl text-slate-800">
                  Manage Schedule
                </h3>
                <p className="text-sm text-slate-500">
                  View & handle upcoming appointments.
                </p>
              </Link>
              <Link
                to="/patients"
                className="block text-center bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <UserIcon />
                <h3 className="font-bold text-xl text-slate-800">
                  My Patients
                </h3>
                <p className="text-sm text-slate-500">
                  Access patient records and history.
                </p>
              </Link>
              <Link
                to="/drug-administration"
                className="block text-center bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <PillIcon />
                <h3 className="font-bold text-xl text-slate-800">
                  Administer Drugs
                </h3>
                <p className="text-sm text-slate-500">
                  Prescribe and log medications.
                </p>
              </Link>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <section id="appointments" className="mb-12">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    Today's Appointments
                  </h2>
                  <ul className="space-y-4">
                    <li className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-slate-800">John Doe</p>
                        <p className="text-sm text-slate-500">
                          11:00 AM - Consultation
                        </p>
                      </div>
                      <Link
                        to="/appointments"
                        className="bg-cyan-600 text-white text-sm font-semibold py-1 px-4 rounded-lg shadow-md hover:bg-cyan-700 transition-colors"
                      >
                        View
                      </Link>
                    </li>
                    <li className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-slate-800">Jane Doe</p>
                        <p className="text-sm text-slate-500">
                          2:30 PM - Follow-up
                        </p>
                      </div>
                      <Link
                        to="/appointments"
                        className="bg-cyan-600 text-white text-sm font-semibold py-1 px-4 rounded-lg shadow-md hover:bg-cyan-700 transition-colors"
                      >
                        View
                      </Link>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="mypatients">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    My Patients
                  </h2>
                  <ul className="space-y-4">
                    <li className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-slate-800">John Doe</p>
                        <p className="text-sm text-slate-500">
                          Last Visit: October 26, 2025
                        </p>
                      </div>
                      <Link
                        to="/patients"
                        className="bg-cyan-600 text-white text-sm font-semibold py-1 px-4 rounded-lg shadow-md hover:bg-cyan-700 transition-colors"
                      >
                        View Records
                      </Link>
                    </li>
                  </ul>
                </div>
              </section>
            </div>

            <div>
              <section id="profile" className="mb-12">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 bg-cyan-200 rounded-full flex items-center justify-center text-cyan-700 font-bold text-2xl">
                        JS
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-700">
                        Dr. Jane Smith
                      </h3>
                      <p className="text-slate-500">General Practitioner</p>
                      <p className="text-slate-500">jane.smith@example.com</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="analytics">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                    Analytics & Insights
                  </h2>
                  <div className="space-y-6 text-center">
                    <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-5xl font-bold text-cyan-600">25</p>
                      <p className="mt-2 text-slate-600">
                        Total Diagnoses This Week
                      </p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-5xl font-bold text-cyan-600">98%</p>
                      <p className="mt-2 text-slate-600">
                        Patient Satisfaction
                      </p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-5xl font-bold text-cyan-600">12</p>
                      <p className="mt-2 text-slate-600">
                        New Patients This Month
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
