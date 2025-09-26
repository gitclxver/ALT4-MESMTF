import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Landing from './pages/Landing';
import Pharmacy from "./pages/Pharmacy";
import Stats from "./pages/Stats";  

import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

import Book from './pages/patient/Book';
import PatientDashboard from './pages/patient/Dashboard';
import Profile from './pages/patient/Profile';
import SelfDiagnostic from './pages/patient/SelfDiagnostic';

import Appointments from './pages/official/Appointments';
import OfficialDashboard from './pages/official/Dashboard';
import DrugAdmin from './pages/official/DrugAdmin';
import MyPatients from './pages/official/MyPatients';
import Unauthorized from './pages/Unauthorized';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes*/}
          <Route path="/" element={<Landing />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/report" element={<Stats />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Patient Protected Routes */}
          <Route 
            path="/book-appointment" 
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Book />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patient-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patient-record" 
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/diagnostic" 
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <SelfDiagnostic />
              </ProtectedRoute>
            } 
          />

          {/* Doctor Protected Routes */}
          <Route 
            path="/appointments" 
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <Appointments />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/official-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <OfficialDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/drug-administration" 
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DrugAdmin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patients" 
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <MyPatients />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;