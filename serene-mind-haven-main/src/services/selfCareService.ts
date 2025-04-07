
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  Timestamp, 
  orderBy,
  limit as firestoreLimit
} from 'firebase/firestore';
import { db } from '../utils/firebase';
import { getCurrentUser, updateUserStreak } from '../utils/auth';

export interface SelfCareActivity {
  id: string;
  userId: string;
  date: Date;
  activityType: string;
  duration: number; // in minutes
  completed: boolean;
}

export const saveSelfCareActivity = async (
  activityType: string,
  duration: number,
  completed: boolean = true
): Promise<SelfCareActivity | null> => {
  try {
    const user = await getCurrentUser();
    if (!user) return null;
    
    const activityData = {
      userId: user.id,
      date: Timestamp.now(),
      activityType,
      duration,
      completed
    };
    
    const docRef = await addDoc(collection(db, 'self_care_activities'), activityData);
    
    if (completed) {
      // Update streak
      await updateUserStreak('selfCare');
    }
    
    return {
      id: docRef.id,
      userId: user.id,
      date: new Date(),
      activityType,
      duration,
      completed
    };
  } catch (error) {
    console.error('Error saving self-care activity:', error);
    return null;
  }
};

export const getSelfCareActivities = async (limitCount?: number): Promise<SelfCareActivity[]> => {
  try {
    const user = await getCurrentUser();
    if (!user) return [];
    
    let q = query(
      collection(db, 'self_care_activities'), 
      where('userId', '==', user.id),
      where('completed', '==', true),
      orderBy('date', 'desc')
    );
    
    if (limitCount) {
      q = query(q, firestoreLimit(limitCount));
    }
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        date: data.date.toDate(),
        activityType: data.activityType,
        duration: data.duration,
        completed: data.completed
      };
    });
  } catch (error) {
    console.error('Error getting self-care activities:', error);
    return [];
  }
};

export const hasDoneSelfCareToday = async (): Promise<boolean> => {
  try {
    const user = await getCurrentUser();
    if (!user) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const q = query(
      collection(db, 'self_care_activities'),
      where('userId', '==', user.id),
      where('completed', '==', true),
      where('date', '>=', Timestamp.fromDate(today)),
      where('date', '<', Timestamp.fromDate(tomorrow))
    );
    
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking if self-care done today:', error);
    return false;
  }
};
