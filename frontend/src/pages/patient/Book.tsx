import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { getAllDoctors, createAppointment } from '../../lib/firestore';
import { StarIcon } from '../../utils/icons';

const Book = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: ''
  });
  const [isBooking, setIsBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Dummy doctors from diagnostic system
  const dummyDoctors = [
    {
      id: 'dr-sarah-wilson',
      name: 'Dr. Sarah Wilson',
      specialty: 'General Physician',
      rating: 4.8,
      location: 'Downtown Medical Center',
      description: 'Experienced general physician specializing in preventive care and chronic disease management.'
    },
    {
      id: 'dr-michael-chen',
      name: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      rating: 4.9,
      location: 'Heart Care Clinic',
      description: 'Leading cardiologist with expertise in heart disease prevention and treatment.'
    },
    {
      id: 'dr-emma-davis',
      name: 'Dr. Emma Davis',
      specialty: 'Dermatologist',
      rating: 4.7,
      location: 'Skin Health Institute',
      description: 'Board-certified dermatologist specializing in skin conditions and cosmetic procedures.'
    },
    {
      id: 'dr-james-taylor',
      name: 'Dr. James Taylor',
      specialty: 'Neurologist',
      rating: 4.8,
      location: 'Brain & Spine Center',
      description: 'Expert neurologist treating various neurological conditions and disorders.'
    },
    {
      id: 'dr-lisa-anderson',
      name: 'Dr. Lisa Anderson',
      specialty: 'Orthopedic Surgeon',
      rating: 4.6,
      location: 'Sports Medicine Clinic',
      description: 'Orthopedic surgeon specializing in sports injuries and joint replacement.'
    },
    {
      id: 'dr-robert-martinez',
      name: 'Dr. Robert Martinez',
      specialty: 'Psychiatrist',
      rating: 4.9,
      location: 'Mental Health Center',
      description: 'Compassionate psychiatrist helping patients with mental health and wellness.'
    }
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const firestoreDoctors = await getAllDoctors();
        const allDoctors = [...firestoreDoctors, ...dummyDoctors];
        setDoctors(allDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setDoctors(dummyDoctors);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setAppointmentForm(prev => ({ ...prev, doctorId: doctor.id }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsBooking(true);
    try {
      await createAppointment({
        patientId: user.uid,
        patientName: user.displayName || 'Patient',
        doctorId: appointmentForm.doctorId,
        doctorName: selectedDoctor?.name || '',
        date: appointmentForm.date,
        time: appointmentForm.time,
        type: appointmentForm.reason,
        status: 'upcoming',
        urgency: 'medium',
        notes: appointmentForm.reason
      });

      setShowSuccess(true);
      setAppointmentForm({ doctorId: '', date: '', time: '', reason: '' });
      setSelectedDoctor(null);
      
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
        <Header />
        <div className='container mx-auto px-4 py-8'>
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <Header />
      
      <div className='container mx-auto px-4 py-8'>
        {/* Header Section */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>Book an Appointment</h1>
          <p className='text-lg text-gray-600'>Choose from our qualified healthcare professionals</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className='mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg'>
            <p className='text-center font-medium'>Appointment booked successfully! We'll contact you soon with confirmation details.</p>
          </div>
        )}

        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Doctors List */}
          <div className='lg:col-span-2'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Available Doctors</h2>
            <div className='grid md:grid-cols-2 gap-6'>
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                    selectedDoctor?.id === doctor.id ? 'border-blue-500 bg-blue-50' : 'border-transparent'
                  }`}
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <div className='flex items-start space-x-4'>
                    <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl'>
                      {doctor.name?.split(' ').map(n => n[0]).join('') || 'DR'}
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-xl font-semibold text-gray-800 mb-1'>{doctor.name}</h3>
                      <p className='text-blue-600 font-medium mb-2'>{doctor.specialty}</p>
                      {doctor.rating && (
                        <div className='flex items-center mb-2'>
                          {renderStars(doctor.rating)}
                          <span className='ml-2 text-gray-600 text-sm'>({doctor.rating})</span>
                        </div>
                      )}
                      <p className='text-gray-600 text-sm mb-2'>{doctor.location}</p>
                      <p className='text-gray-700 text-sm'>{doctor.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appointment Form */}
          <div>
            <div className='bg-white rounded-xl shadow-lg p-6 sticky top-4'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Book Appointment</h2>
              
              {selectedDoctor ? (
                <form onSubmit={handleBookAppointment} className='space-y-4'>
                  <div className='bg-blue-50 p-4 rounded-lg'>
                    <h3 className='font-semibold text-gray-800'>{selectedDoctor.name}</h3>
                    <p className='text-blue-600 text-sm'>{selectedDoctor.specialty}</p>
                  </div>

                  <div>
                    <label htmlFor='date' className='block text-sm font-medium text-gray-700 mb-2'>
                      Preferred Date
                    </label>
                    <input
                      type='date'
                      id='date'
                      name='date'
                      value={appointmentForm.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label htmlFor='time' className='block text-sm font-medium text-gray-700 mb-2'>
                      Preferred Time
                    </label>
                    <select
                      id='time'
                      name='time'
                      value={appointmentForm.time}
                      onChange={handleInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    >
                      <option value=''>Select Time</option>
                      <option value='09:00'>9:00 AM</option>
                      <option value='10:00'>10:00 AM</option>
                      <option value='11:00'>11:00 AM</option>
                      <option value='14:00'>2:00 PM</option>
                      <option value='15:00'>3:00 PM</option>
                      <option value='16:00'>4:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor='reason' className='block text-sm font-medium text-gray-700 mb-2'>
                      Reason for Visit
                    </label>
                    <textarea
                      id='reason'
                      name='reason'
                      value={appointmentForm.reason}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder='Please describe your symptoms or reason for the appointment...'
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                    />
                  </div>

                  <button
                    type='submit'
                    disabled={isBooking}
                    className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isBooking ? 'Booking...' : 'Book Appointment'}
                  </button>
                </form>
              ) : (
                <div className='text-center py-8'>
                  <div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                    </svg>
                  </div>
                  <p className='text-gray-600'>Select a doctor to book an appointment</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Book;
