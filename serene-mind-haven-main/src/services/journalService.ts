
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  deleteDoc, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../utils/firebase';
import { getCurrentUser, updateUserStreak } from '../utils/auth';

export interface JournalEntry {
  id: string;
  userId: string;
  date: Date;
  content: string;
  mood?: 'great' | 'good' | 'okay' | 'sad' | 'awful';
}

export const saveJournalEntry = async (
  content: string, 
  mood?: 'great' | 'good' | 'okay' | 'sad' | 'awful'
): Promise<JournalEntry | null> => {
  try {
    const user = await getCurrentUser();
    if (!user) return null;
    
    const entryData = {
      userId: user.id,
      date: Timestamp.now(),
      content,
      mood
    };
    
    const docRef = await addDoc(collection(db, 'journal_entries'), entryData);
    
    // Update streak
    await updateUserStreak('journal');
    
    return {
      id: docRef.id,
      userId: user.id,
      date: new Date(),
      content,
      mood
    };
  } catch (error) {
    console.error('Error saving journal entry:', error);
    return null;
  }
};

export const getJournalEntries = async (): Promise<JournalEntry[]> => {
  try {
    const user = await getCurrentUser();
    if (!user) return [];
    
    const q = query(
      collection(db, 'journal_entries'), 
      where('userId', '==', user.id),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        date: data.date.toDate(),
        content: data.content,
        mood: data.mood
      };
    });
  } catch (error) {
    console.error('Error getting journal entries:', error);
    return [];
  }
};

export const deleteJournalEntry = async (entryId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'journal_entries', entryId));
    return true;
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    return false;
  }
};

export const getJournalEntriesCount = async (): Promise<number> => {
  try {
    const entries = await getJournalEntries();
    return entries.length;
  } catch (error) {
    console.error('Error counting journal entries:', error);
    return 0;
  }
};
