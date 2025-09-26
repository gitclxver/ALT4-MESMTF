import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type { User, Doctor, Patient, RegisterData } from '../types/user';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userData: User | Doctor | Patient | null;
  loading: boolean;
  register: (data: RegisterData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | Doctor | Patient | null>(null);
  const [loading, setLoading] = useState(true);

  // Register new user
  const register = async (data: RegisterData) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      
      const user = userCredential.user;

      // Prepare user data for Firestore
      const baseUserData = {
        uid: user.uid,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        phoneNumber: data.phoneNumber || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      let userDocData;

      if (data.role === 'doctor') {
        userDocData = {
          ...baseUserData,
          specialization: data.specialization || '',
          licenseNumber: data.licenseNumber || '',
          department: data.department || '',
          experience: data.experience || 0,
          isAvailable: true
        };
      } else {
        userDocData = {
          ...baseUserData,
          dateOfBirth: data.dateOfBirth || null,
          gender: data.gender || 'other',
          address: data.address || '',
          emergencyContact: data.emergencyContact || null,
          medicalHistory: []
        };
      }

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), userDocData);
      
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Login user
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  // Fetch user data from Firestore
  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData({
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
          dateOfBirth: data.dateOfBirth?.toDate()
        } as User | Doctor | Patient);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
