
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

interface User {
  id: string;
  name: string;
  email: string;
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  trustedContact?: {
    name: string;
    email: string;
    phone?: string;
  };
  periodTracking?: {
    enabled: boolean;
    lastPeriod?: Date;
    cycleLength?: number;
    periodLength?: number;
  };
  streaks?: {
    journal: number;
    selfCare: number;
    lastJournalDate?: Date;
    lastSelfCareDate?: Date;
  };
}

export const login = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data() as Omit<User, 'id'>;
      return {
        id: firebaseUser.uid,
        ...userData
      };
    }
    return null;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

export const signup = async (
  name: string,
  email: string,
  password: string,
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say',
  trustedContact?: { name: string; email: string; phone?: string }
): Promise<User | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    
    // Update display name
    await updateProfile(firebaseUser, {
      displayName: name
    });
    
    // Enable period tracking if female
    const periodTracking = gender === 'female' ? { enabled: true } : { enabled: false };
    
    // Create user document in Firestore
    const userData: Omit<User, 'id'> = {
      name,
      email,
      gender,
      trustedContact,
      periodTracking,
      streaks: {
        journal: 0,
        selfCare: 0
      }
    };
    
    await setDoc(doc(db, 'users', firebaseUser.uid), userData);
    
    return {
      id: firebaseUser.uid,
      ...userData
    };
  } catch (error) {
    console.error('Signup error:', error);
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      unsubscribe();
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as Omit<User, 'id'>;
          resolve({
            id: firebaseUser.uid,
            ...userData
          });
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  });
};

export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return !!user;
};

export const updateUser = async (userData: Partial<User>): Promise<User | null> => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return null;
    
    await updateDoc(doc(db, 'users', currentUser.id), userData);
    
    return {
      ...currentUser,
      ...userData
    };
  } catch (error) {
    console.error('Update user error:', error);
    return null;
  }
};

export const updateUserStreak = async (type: 'journal' | 'selfCare'): Promise<number> => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.streaks) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastDate = type === 'journal' 
      ? currentUser.streaks.lastJournalDate 
      : currentUser.streaks.lastSelfCareDate;
    
    let streak = currentUser.streaks[type];
    
    if (lastDate) {
      const lastDateTime = new Date(lastDate).getTime();
      const oneDayMs = 24 * 60 * 60 * 1000;
      const daysSinceLastActivity = Math.floor((today.getTime() - lastDateTime) / oneDayMs);
      
      if (daysSinceLastActivity === 0) {
        // Already updated today
        return streak;
      } else if (daysSinceLastActivity === 1) {
        // Consecutive day
        streak += 1;
      } else {
        // Streak broken
        streak = 1;
      }
    } else {
      // First time
      streak = 1;
    }
    
    const updateData: any = {
      [`streaks.${type}`]: streak,
    };
    
    if (type === 'journal') {
      updateData['streaks.lastJournalDate'] = today;
    } else {
      updateData['streaks.lastSelfCareDate'] = today;
    }
    
    await updateDoc(doc(db, 'users', currentUser.id), updateData);
    
    return streak;
  } catch (error) {
    console.error(`Update ${type} streak error:`, error);
    return 0;
  }
};
