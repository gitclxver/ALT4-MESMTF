import React, { useState } from 'react';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (validateForm()) {
      setMessage({ text: 'Login successful! Redirecting to dashboard...', type: 'success' });
      console.log('User login data:', formData);
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
            Welcome Back
          </h2>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
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
                fontSize: '14px',
                transition: 'border-color 0.3s'
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '5px' }}>{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '25px' }}>
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
              placeholder="Enter your password"
            />
            {errors.password && (
              <p style={{ color: '#dc2626', fontSize: '12px', marginTop: '5px' }}>{errors.password}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <a 
              href="/forgot-password" 
              style={{ 
                color: '#1a56db', 
                textDecoration: 'none', 
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Forgot your password?
            </a>
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
            Sign In
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
            Don't have an account?{' '}
            <a 
              href="/signup" 
              style={{ 
                color: '#1a56db', 
                textDecoration: 'none', 
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Sign Up
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

export default Login;