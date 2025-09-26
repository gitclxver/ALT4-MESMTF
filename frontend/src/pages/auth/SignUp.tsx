import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { RegisterData } from '../../types/user';
import Header from "../../components/layout/Header";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'patient',
    phoneNumber: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      navigate('/login');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
            Create Account
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Account Type
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                required
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                required
                minLength={6}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            {/* Doctor-specific fields */}
            {formData.role === 'doctor' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                    placeholder="e.g., General Medicine, Infectious Diseases"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    License Number
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </>
            )}

            {/* Patient-specific fields */}
            {formData.role === 'patient' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender || 'other'}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-600 text-white font-semibold py-3 rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <p className="text-center text-slate-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-600 hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;