import { collection, addDoc, query, where, getDocs, orderBy, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

// Appointment interfaces
export interface Appointment {
  id?: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled' | 'in-progress';
  urgency: 'high' | 'medium' | 'low';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Diagnosis interfaces
export interface Diagnosis {
  id?: string;
  patientId: string;
  patientName: string;
  symptoms: string[];
  malariaScore: number;
  typhoidScore: number;
  diagnosis: string;
  confidence: number;
  status: 'pending' | 'confirmed' | 'rejected';
  doctorId?: string;
  doctorNotes?: string;
  treatmentRecommendation?: string;
  urgencyLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: Date;
  updatedAt: Date;
}

// Medical Record interfaces
export interface MedicalRecord {
  id?: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  appointmentId?: string;
  diagnosisId?: string;
  symptoms: string[];
  diagnosis: string;
  treatment: string;
  medications: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// Appointment Functions
export const createAppointment = async (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const getPatientAppointments = async (patientId: string) => {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('patientId', '==', patientId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    })) as Appointment[];
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    return [];
  }
};

export const getDoctorAppointments = async (doctorId: string) => {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('doctorId', '==', doctorId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    })) as Appointment[];
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    return [];
  }
};

// Diagnosis Functions
export const saveDiagnosis = async (diagnosisData: Omit<Diagnosis, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'diagnoses'), {
      ...diagnosisData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving diagnosis:', error);
    throw error;
  }
};

export const getPatientDiagnoses = async (patientId: string) => {
  try {
    const q = query(
      collection(db, 'diagnoses'),
      where('patientId', '==', patientId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    })) as Diagnosis[];
  } catch (error) {
    console.error('Error fetching patient diagnoses:', error);
    return [];
  }
};

export const updateDiagnosisStatus = async (diagnosisId: string, status: 'confirmed' | 'rejected', doctorNotes?: string) => {
  try {
    await updateDoc(doc(db, 'diagnoses', diagnosisId), {
      status,
      doctorNotes,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating diagnosis status:', error);
    throw error;
  }
};

// Medical Records Functions
export const createMedicalRecord = async (recordData: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'medicalRecords'), {
      ...recordData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating medical record:', error);
    throw error;
  }
};

export const getPatientMedicalRecords = async (patientId: string) => {
  try {
    const q = query(
      collection(db, 'medicalRecords'),
      where('patientId', '==', patientId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    })) as MedicalRecord[];
  } catch (error) {
    console.error('Error fetching medical records:', error);
    return [];
  }
};

// Get all patients for doctors
export const getAllPatients = async () => {
  try {
    const q = query(collection(db, 'users'), where('role', '==', 'patient'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    }));
  } catch (error) {
    console.error('Error fetching patients:', error);
    return [];
  }
};

// Get all doctors for patients
export const getAllDoctors = async () => {
  try {
    const q = query(collection(db, 'users'), where('role', '==', 'doctor'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    }));
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};