import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from './pages/Landing';
import Pharmacy from "./pages/Pharmacy";
import Stats from "./pages/Stats";  

import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

import Book from './pages/patient/Book';
import PatientDashboard from './pages/patient/Dashboard';
import Profile from './pages/patient/Profile';
import SelfDiagnostic from './pages/patient/SelfDiagnostic';
import TreatmentPlan from './pages/patient/TreatmentPlan';

import Appointments from './pages/official/Appointments';
import OfficialDashboard from './pages/official/Dashboard';
import DrugAdmin from './pages/official/DrugAdmin';
import MyPatients from './pages/official/MyPatients';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes*/}
        <Route path="/" element={<Landing />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/report" element={<Stats />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/book-appointment" element={<Book />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/patient-record" element={<Profile />} />
        <Route path="/diagnostic" element={<SelfDiagnostic />} />
        <Route path="/treatment-plan" element={<TreatmentPlan />} />

        <Route path="/appointments" element={<Appointments />} />
        <Route path="/official-dashboard" element={<OfficialDashboard />} />
        <Route path="/drug-administration" element={<DrugAdmin />} />
        <Route path="/patients" element={<MyPatients />} />
      </Routes>
    </Router>
  );
}

export default App;