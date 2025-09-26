import Header from "../../components/layout/Header";
import { ClipboardListIcon, PillIcon, CalendarIcon, BrainIcon, StethoscopeIcon } from "../../utils/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { getPatientAppointments, type Appointment as FirestoreAppointment } from "../../lib/firestore";

interface DiagnosisResult {
  id: string;
  date: string;
  diagnosis: string;
  confidence: number;
  symptoms: string[];
  status: 'pending' | 'confirmed';
}



function Dashboard() {
  const { currentUser, userData } = useAuth();
  const [upcomingAppointments, setUpcomingAppointments] = useState<FirestoreAppointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  const [diagnosisHistory] = useState<DiagnosisResult[]>([
    {
      id: "1",
      date: "September 20, 2025",
      diagnosis: "Suspected Malaria",
      confidence: 85,
      symptoms: ["Fever", "Headache", "Chills", "Fatigue"],
      status: 'confirmed'
    },
    {
      id: "2", 
      date: "September 15, 2025",
      diagnosis: "Low Risk",
      confidence: 25,
      symptoms: ["Mild headache"],
      status: 'pending'
    }
  ]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!currentUser) return;
      
      try {
        setLoadingAppointments(true);
        const appointments = await getPatientAppointments(currentUser.uid);
        // Filter for upcoming appointments only
        const upcoming = appointments.filter(apt => apt.status === 'upcoming');
        setUpcomingAppointments(upcoming);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, [currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Hello, {userData?.firstName || 'Patient'}! 👋
              </h1>
              <p className="text-xl text-cyan-100">
                How are you feeling today? Let's take care of your health together.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold">{new Date().getDate()}</div>
                <div className="text-sm">{new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions - Prominent and Easy to Find */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">What would you like to do?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/diagnostic"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center border-2 border-transparent hover:border-red-200 hover:-translate-y-2"
            >
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <BrainIcon />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">AI Health Check</h3>
              <p className="text-slate-600 text-sm">Get instant diagnosis based on your symptoms</p>
              <div className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:bg-red-600 transition-colors">
                Start Now
              </div>
            </Link>

            <Link
              to="/book-appointment"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center border-2 border-transparent hover:border-blue-200 hover:-translate-y-2"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <CalendarIcon />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Book Appointment</h3>
              <p className="text-slate-600 text-sm">Schedule a visit with our expert doctors</p>
              <div className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:bg-blue-600 transition-colors">
                Book Now
              </div>
            </Link>

            <Link
              to="/patient-record"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center border-2 border-transparent hover:border-green-200 hover:-translate-y-2"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <ClipboardListIcon />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">My Records</h3>
              <p className="text-slate-600 text-sm">View your complete medical history</p>
              <div className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:bg-green-600 transition-colors">
                View Records
              </div>
            </Link>

            <Link
              to="/pharmacy"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center border-2 border-transparent hover:border-purple-200 hover:-translate-y-2"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <PillIcon />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Pharmacy</h3>
              <p className="text-slate-600 text-sm">Order medications and prescriptions</p>
              <div className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:bg-purple-600 transition-colors">
                Browse
              </div>
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Health Overview - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Diagnosis Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                  <div className="bg-red-100 p-2 rounded-lg mr-3">
                    <StethoscopeIcon />
                  </div>
                  Your Health Status
                </h2>
                <Link 
                  to="/diagnostic" 
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  New Check
                </Link>
              </div>
              
              {diagnosisHistory.length > 0 ? (
                <div className="space-y-4">
                  {diagnosisHistory.map((diagnosis) => (
                    <div key={diagnosis.id} className="border-l-4 border-l-cyan-500 bg-gradient-to-r from-cyan-50 to-transparent rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-slate-800 text-lg">{diagnosis.diagnosis}</h3>
                          <p className="text-slate-500">{diagnosis.date}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                            diagnosis.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {diagnosis.status === 'confirmed' ? '✅ Confirmed' : '⏳ Pending'}
                          </span>
                          <div className={`text-sm font-bold ${
                            diagnosis.confidence >= 80 ? 'text-red-600' : 
                            diagnosis.confidence >= 60 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {diagnosis.confidence}% confidence
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-3 mb-3">
                        <p className="text-sm text-slate-600">
                          <strong>Symptoms reported:</strong> {diagnosis.symptoms.join(', ')}
                        </p>
                      </div>
                      
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            diagnosis.confidence >= 80 ? 'bg-gradient-to-r from-red-400 to-red-600' : 
                            diagnosis.confidence >= 60 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                            'bg-gradient-to-r from-green-400 to-green-600'
                          }`}
                          style={{ width: `${diagnosis.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-slate-400 text-6xl mb-4">🏥</div>
                  <p className="text-slate-500 text-lg">No health checks yet</p>
                  <p className="text-slate-400">Start your first AI diagnosis to see your health status</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Appointments Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3 text-xl">
                  �
                </div>
                Upcoming Appointments
              </h3>
              
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-slate-800">{appointment.doctorName}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'upcoming' 
                            ? 'bg-blue-100 text-blue-800' 
                            : appointment.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : appointment.status === 'in-progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-1">Appointment Type: {appointment.type}</p>
                      <div className="flex items-center text-slate-600 text-sm mb-1">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {appointment.date}
                      </div>
                      <div className="flex items-center text-slate-600 text-sm mb-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {appointment.time}
                      </div>
                      {appointment.notes && (
                        <p className="text-sm text-slate-500">
                          <span className="font-medium">Notes:</span> {appointment.notes}
                        </p>
                      )}
                    </div>
                  ))}
                  <Link
                    to="/book-appointment"
                    className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                  >
                    Manage Appointments
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-slate-400 text-4xl mb-3">📅</div>
                  <p className="text-slate-500 text-sm mb-3">No upcoming appointments</p>
                  <Link
                    to="/book-appointment"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
                  >
                    Book Appointment
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-600 text-sm">
              © 2024 MESMTF - Medical Expert System for Malaria and Typhoid Fever
            </p>
            <p className="text-slate-500 text-xs mt-2">
              This system provides preliminary medical guidance. Always consult with healthcare professionals for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Dashboard;