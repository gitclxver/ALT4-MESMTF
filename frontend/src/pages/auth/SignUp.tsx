
import React, { useState } from 'react';

interface FormData {
  name: string;
  surname: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  surname?: string;
  email?: string;
  role?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }

    if (formData.surname.trim().length < 2) {
      newErrors.surname = 'Surname must be at least 2 characters long.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.role) {
      newErrors.role = 'Please select your role.';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (validateForm()) {
      setMessage({ text: 'Account created successfully! Redirecting to dashboard...', type: 'success' });
      console.log('User registration data:', formData);
    } else {
      setMessage({ text: 'Please correct the errors and try again.', type: 'error' });
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #1a56db 0%, #0e4ba0 100%)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        border: '1px solid #e0e7ff'
      }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#1a56db',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7H9V5.5L3 7V9L9 10.5V12.5L3 14V16L9 17.5V21H15V17.5L21 16V14L15 12.5V10.5L21 9Z"/>
              </svg>
            </div>
            <div style={{ textAlign: 'left' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a56db', margin: 0 }}>
                MESMTF
              </h1>
              <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
                Expert System for Malaria & Typhoid Fever
              </p>
            </div>
          </div>
          
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
            Create Account
          </h2>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Join our AI-powered healthcare platform
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name Inputs in Row */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                First Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.name ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  transition: 'border-color 0.3s'
                }}
                placeholder="Enter first name"
              />
              {errors.name && (
                <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '5px' }}>{errors.name}</p>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                Last Name
              </label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.surname ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                placeholder="Enter last name"
              />
              {errors.surname && (
                <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '5px' }}>{errors.surname}</p>
              )}
            </div>
          </div>

          {/* Email Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.email ? '#dc2626' : '#d1d5db'}`,
                borderRadius: '8px',
                fontSize: '14px'
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '5px' }}>{errors.email}</p>
            )}
          </div>

          {/* Role Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
              I am a
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.role ? '#dc2626' : '#d1d5db'}`,
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select your role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Healthcare Professional</option>
              <option value="official">Ministry Official</option>
            </select>
            {errors.role && (
              <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '5px' }}>{errors.role}</p>
            )}
          </div>

          {/* Password Inputs */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.password ? '#dc2626' : '#d1d5db'}`,
                borderRadius: '8px',
                fontSize: '14px'
              }}
              placeholder="Create a password"
            />
            {errors.password && (
              <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '5px' }}>{errors.password}</p>
            )}
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.confirmPassword ? '#dc2626' : '#d1d5db'}`,
                borderRadius: '8px',
                fontSize: '14px'
              }}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '5px' }}>{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#1a56db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              marginBottom: '20px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0e4ba0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1a56db'}
          >
            Create Account
          </button>
        </form>

        {message && (
          <div style={{
            padding: '15px',
            borderRadius: '8px',
            backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
            color: message.type === 'success' ? '#065f46' : '#dc2626',
            border: `1px solid ${message.type === 'success' ? '#a7f3d0' : '#fecaca'}`,
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {message.text}
          </div>
        )}

        <div style={{ textAlign: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>
            Already have an account?{' '}
            <a 
              href="/login" 
              style={{ 
                color: '#1a56db', 
                textDecoration: 'none', 
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Sign In
            </a>
          </p>
        </div>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '30px', 
          padding: '15px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>
            An AI-powered Expert System for the Diagnosis and Management of<br />
            Malaria and Typhoid Fever, empowering the Ministry of Health and Social Services
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;