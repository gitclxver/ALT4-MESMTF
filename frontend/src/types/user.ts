export interface User {
  uid: string;
  email: string;
  role: 'doctor' | 'patient';
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  department: string;
  experience: number;
  isAvailable: boolean;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
  medicalHistory?: string[];
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'doctor' | 'patient';
  phoneNumber?: string;
  // Doctor specific fields
  specialization?: string;
  licenseNumber?: string;
  department?: string;
  experience?: number;
  // Patient specific fields
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  emergencyContact?: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
}
