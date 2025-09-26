import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';

const Unauthorized: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-slate-800 mb-4">
            Access Denied
          </h1>
          
          <p className="text-slate-600 mb-6">
            You don't have permission to access this page. Please make sure you're logged in with the correct account type.
          </p>
          
          <div className="space-y-3">
            <Link 
              to="/login" 
              className="block w-full bg-cyan-600 text-white font-semibold py-3 rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Go to Login
            </Link>
            <Link 
              to="/" 
              className="block w-full bg-slate-200 text-slate-700 font-semibold py-3 rounded-lg hover:bg-slate-300 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;