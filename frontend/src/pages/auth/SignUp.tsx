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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
            Create Account
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>Join Our Healthcare Revolution</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
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
                border: `2px solid ${errors.name ? '#ff4444' : '#ddd'}`,
                borderRadius: '5px',
                fontSize: '16px',
                transition: 'border-color 0.3s'
              }}
              placeholder="Enter your first name"
            />
            {errors.name && (
              <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '5px' }}>{errors.name}</p>
            )}
          </div>

          {/* Surname Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
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
                border: `2px solid ${errors.surname ? '#ff4444' : '#ddd'}`,
                borderRadius: '5px',
                fontSize: '16px'
              }}
              placeholder="Enter your last name"
            />
            {errors.surname && (
              <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '5px' }}>{errors.surname}</p>
            )}
          </div>

          {/* Email Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
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
                border: `2px solid ${errors.email ? '#ff4444' : '#ddd'}`,
                borderRadius: '5px',
                fontSize: '16px'
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '5px' }}>{errors.email}</p>
            )}
          </div>

          {/* Role Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${errors.role ? '#ff4444' : '#ddd'}`,
                borderRadius: '5px',
                fontSize: '16px',
                backgroundColor: 'white'
              }}
            >
              <option value="">Select your role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
            {errors.role && (
              <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '5px' }}>{errors.role}</p>
            )}
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
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
                border: `2px solid ${errors.password ? '#ff4444' : '#ddd'}`,
                borderRadius: '5px',
                fontSize: '16px'
              }}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '5px' }}>{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
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
                border: `2px solid ${errors.confirmPassword ? '#ff4444' : '#ddd'}`,
                borderRadius: '5px',
                fontSize: '16px'
              }}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '5px' }}>{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a6fd8'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#667eea'}
          >
            Create Account
          </button>
        </form>

        {message && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            borderRadius: '5px',
            backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message.text}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Already have an account?{' '}
            <a href="#" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold' }}>
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;