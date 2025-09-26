import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { Link } from "react-router-dom";
import { CalendarIcon, UserIcon, PillIcon } from "../../utils/icons";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  condition: string;
  status: 'critical' | 'stable' | 'recovering';
  diagnosisDate: string;
}

interface TodayAppointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: 'pending' | 'completed' | 'in-progress';
  urgency: 'high' | 'medium' | 'low';
}

interface Stats {
  totalPatients: number;
  todayAppointments: number;
  completedToday: number;
  criticalCases: number;
}

function Dashboard() {
  const { userData } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<TodayAppointment[]>([]);
  const [stats, setStats] = useState<Stats>({ totalPatients: 0, todayAppointments: 0, completedToday: 0, criticalCases: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctorData = async () => {
      // Mock patients data
      const mockPatients: Patient[] = [
        {
          id: '1',
          name: 'John Doe',
          age: 34,
          lastVisit: '2025-09-24',
          condition: 'Malaria - High Risk',
          status: 'critical',
          diagnosisDate: '2025-09-23'
        },
        {
          id: '2',
          name: 'Jane Smith',
          age: 28,
          condition: 'Typhoid - Moderate',
          status: 'stable',
          lastVisit: '2025-09-22',
          diagnosisDate: '2025-09-20'
        },
        {
          id: '3',
          name: 'Michael Johnson',
          age: 45,
          condition: 'Follow-up',
          status: 'recovering',
          lastVisit: '2025-09-18',
          diagnosisDate: '2025-09-15'
        }
      ];

      // Mock today's appointments
      const mockAppointments: TodayAppointment[] = [
        {
          id: '1',
          patientName: 'Alice Brown',
          time: '09:00 AM',
          type: 'Malaria Consultation',
          status: 'completed',
          urgency: 'high'
        },
        {
          id: '2',
          patientName: 'Bob Wilson',
          time: '10:30 AM',
          type: 'Typhoid Follow-up',
          status: 'in-progress',
          urgency: 'medium'
        },
        {
          id: '3',
          patientName: 'Carol Davis',
          time: '02:00 PM',
          type: 'General Consultation',
          status: 'pending',
          urgency: 'low'
        },
        {
          id: '4',
          patientName: 'David Miller',
          time: '03:30 PM',
          type: 'Emergency',
          status: 'pending',
          urgency: 'high'
        }
      ];

      const mockStats: Stats = {
        totalPatients: mockPatients.length,
        todayAppointments: mockAppointments.length,
        completedToday: mockAppointments.filter(apt => apt.status === 'completed').length,
        criticalCases: mockPatients.filter(p => p.status === 'critical').length
      };

      setPatients(mockPatients);
      setTodayAppointments(mockAppointments);
      setStats(mockStats);
      setLoading(false);
    };

    loadDoctorData();
  }, [userData]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading your dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-slate-800 text-center mb-6">
            Welcome Back, Dr. {userData?.lastName || 'Doctor'}
          </h1>
          <p className="text-center text-slate-500 text-lg mb-12">
            Here's a summary of your activities today.
          </p>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalPatients}</div>
              <div className="text-slate-600">Total Patients</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.todayAppointments}</div>
              <div className="text-slate-600">Today's Appointments</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-cyan-600 mb-2">{stats.completedToday}</div>
              <div className="text-slate-600">Completed Today</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{stats.criticalCases}</div>
              <div className="text-slate-600">Critical Cases</div>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Today's Appointments */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Today's Schedule</h2>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className={`border-l-4 p-4 rounded-lg ${
                      appointment.urgency === 'high' ? 'border-red-500 bg-red-50' :
                      appointment.urgency === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                      'border-green-500 bg-green-50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-slate-800">{appointment.patientName}</h3>
                          <p className="text-sm text-slate-600">{appointment.type}</p>
                          <p className="text-sm text-slate-500">{appointment.time}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {appointment.status}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            appointment.urgency === 'high' ? 'bg-red-100 text-red-800' :
                            appointment.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {appointment.urgency}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link 
                    to="/appointments" 
                    className="block text-center text-cyan-600 hover:text-cyan-800 font-medium mt-4"
                  >
                    View All Appointments →
                  </Link>
                </div>
              </div>
            </div>

            {/* Critical Patients */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Critical Patients</h2>
                <div className="space-y-3">
                  {patients.filter(p => p.status === 'critical').map((patient) => (
                    <div key={patient.id} className="border border-red-200 rounded-lg p-3 bg-red-50">
                      <h4 className="font-medium text-slate-800">{patient.name}</h4>
                      <p className="text-sm text-slate-600">{patient.condition}</p>
                      <p className="text-xs text-slate-500">Last visit: {patient.lastVisit}</p>
                    </div>
                  ))}
                  <Link 
                    to="/patients" 
                    className="block text-center text-cyan-600 hover:text-cyan-800 font-medium"
                  >
                    View All Patients →
                  </Link>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link
                    to="/appointments"
                    className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <CalendarIcon />
                    <div className="ml-3">
                      <h4 className="font-medium text-slate-800">Manage Schedule</h4>
                      <p className="text-sm text-slate-500">View appointments</p>
                    </div>
                  </Link>
                  
                  <Link
                    to="/patients"
                    className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <UserIcon />
                    <div className="ml-3">
                      <h4 className="font-medium text-slate-800">Patient Records</h4>
                      <p className="text-sm text-slate-500">Access histories</p>
                    </div>
                  </Link>
                  
                  <Link
                    to="/drug-administration"
                    className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <PillIcon />
                    <div className="ml-3">
                      <h4 className="font-medium text-slate-800">Prescriptions</h4>
                      <p className="text-sm text-slate-500">Manage drugs</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

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
