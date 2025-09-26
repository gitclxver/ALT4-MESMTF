import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../contexts/AuthContext";
import type { Patient as UserPatient } from "../../types/user";

interface PatientWithDiagnosis extends UserPatient {
  latestDiagnosis?: string;
  diagnosisDate?: string;
  status?: 'critical' | 'stable' | 'recovering';
}

function MyPatients() {
  const { userData } = useAuth();
  const [patients, setPatients] = useState<PatientWithDiagnosis[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadPatients = async () => {
      try {
        // For demo purposes, we'll use mock data that looks like real Firebase data
        const mockPatients: PatientWithDiagnosis[] = [
          {
            uid: 'patient1',
            email: 'john.doe@email.com',
            firstName: 'John',
            lastName: 'Doe',
            role: 'patient',
            phoneNumber: '+264-81-123-4567',
            dateOfBirth: new Date('1990-05-15'),
            gender: 'male',
            address: '123 Main St, Windhoek',
            emergencyContact: {
              name: 'Jane Doe',
              phoneNumber: '+264-81-987-6543',
              relationship: 'Spouse'
            },
            medicalHistory: ['Hypertension'],
            createdAt: new Date('2025-09-01'),
            updatedAt: new Date('2025-09-24'),
            latestDiagnosis: 'Confirmed Malaria - High Risk',
            diagnosisDate: '2025-09-24',
            status: 'critical'
          },
          {
            uid: 'patient2',
            email: 'alice.johnson@email.com',
            firstName: 'Alice',
            lastName: 'Johnson',
            role: 'patient',
            phoneNumber: '+264-81-234-5678',
            dateOfBirth: new Date('1995-08-22'),
            gender: 'female',
            address: '456 Oak Ave, Windhoek',
            emergencyContact: {
              name: 'Bob Johnson',
              phoneNumber: '+264-81-876-5432',
              relationship: 'Father'
            },
            medicalHistory: [],
            createdAt: new Date('2025-09-10'),
            updatedAt: new Date('2025-09-23'),
            latestDiagnosis: 'Typhoid Fever - Moderate Risk',
            diagnosisDate: '2025-09-22',
            status: 'stable'
          },
          {
            uid: 'patient3',
            email: 'michael.brown@email.com',
            firstName: 'Michael',
            lastName: 'Brown',
            role: 'patient',
            phoneNumber: '+264-81-345-6789',
            dateOfBirth: new Date('1978-12-10'),
            gender: 'male',
            address: '789 Pine St, Windhoek',
            emergencyContact: {
              name: 'Sarah Brown',
              phoneNumber: '+264-81-765-4321',
              relationship: 'Wife'
            },
            medicalHistory: ['Diabetes Type 2'],
            createdAt: new Date('2025-08-15'),
            updatedAt: new Date('2025-09-20'),
            latestDiagnosis: 'Follow-up - Recovery',
            diagnosisDate: '2025-09-18',
            status: 'recovering'
          }
        ];

        setPatients(mockPatients);
        setLoading(false);
      } catch (error) {
        console.error('Error loading patients:', error);
        setLoading(false);
      }
    };

    loadPatients();
  }, [userData]);

  const filteredPatients = useMemo(() => {
    return patients.filter(patient =>
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.latestDiagnosis?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading patients...</p>
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
            My Patients
          </h1>
          <p className="text-center text-slate-500 text-lg mb-12">
            Manage and monitor your patients' health records
          </p>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search patients by name or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Patient Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{patients.length}</div>
              <div className="text-slate-600">Total Patients</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {patients.filter(p => p.status === 'critical').length}
              </div>
              <div className="text-slate-600">Critical Cases</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {patients.filter(p => p.status === 'recovering').length}
              </div>
              <div className="text-slate-600">Recovering</div>
            </div>
          </div>

          {/* Patients List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <div key={patient.uid} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {patient.firstName} {patient.lastName}
                    </h3>
                    <p className="text-slate-500">
                      Age: {new Date().getFullYear() - patient.dateOfBirth.getFullYear()}
                    </p>
                    <p className="text-slate-500">Gender: {patient.gender}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    patient.status === 'critical' ? 'bg-red-100 text-red-800' :
                    patient.status === 'stable' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {patient.status}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div>
                    <strong className="text-slate-700">Latest Diagnosis:</strong>
                    <p className="text-slate-600">{patient.latestDiagnosis}</p>
                  </div>
                  <div>
                    <strong className="text-slate-700">Diagnosis Date:</strong>
                    <p className="text-slate-600">{patient.diagnosisDate}</p>
                  </div>
                  <div>
                    <strong className="text-slate-700">Contact:</strong>
                    <p className="text-slate-600">{patient.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors">
                    View Records
                  </button>
                  <button className="flex-1 bg-slate-200 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No patients found matching your search.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyPatients;