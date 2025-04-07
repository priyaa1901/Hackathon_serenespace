
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { 
  User, 
  Calendar, 
  Award, 
  BookOpen, 
  Heart, 
  LogOut, 
  Edit, 
  Save, 
  Phone, 
  Mail 
} from 'lucide-react';
import { getCurrentUser, logout, updateUser } from '../utils/auth';
import { getJournalEntriesCount } from '../services/journalService';
import { toast } from 'sonner';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface UserProfile {
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
  };
  streaks?: {
    journal: number;
    selfCare: number;
  };
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [journalCount, setJournalCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    trustedContactName: '',
    trustedContactEmail: '',
    trustedContactPhone: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUserProfile(user);
          setFormData({
            name: user.name,
            gender: user.gender || '',
            trustedContactName: user.trustedContact?.name || '',
            trustedContactEmail: user.trustedContact?.email || '',
            trustedContactPhone: user.trustedContact?.phone || ''
          });
        }
        
        const count = await getJournalEntriesCount();
        setJournalCount(count);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const updatedUser = await updateUser({
        name: formData.name,
        gender: formData.gender as 'male' | 'female' | 'non-binary' | 'prefer-not-to-say',
        trustedContact: {
          name: formData.trustedContactName,
          email: formData.trustedContactEmail,
          phone: formData.trustedContactPhone
        }
      });
      
      if (updatedUser) {
        setUserProfile(updatedUser);
        setEditMode(false);
        toast('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast('Failed to update profile');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getBadgeName = (streakCount: number) => {
    if (streakCount >= 30) return 'Diamond';
    if (streakCount >= 21) return 'Platinum';
    if (streakCount >= 14) return 'Gold';
    if (streakCount >= 7) return 'Silver';
    if (streakCount >= 3) return 'Bronze';
    return 'Beginner';
  };

  const getBadgeColor = (streakCount: number) => {
    if (streakCount >= 30) return 'bg-blue-100 text-blue-800';
    if (streakCount >= 21) return 'bg-gray-100 text-gray-800';
    if (streakCount >= 14) return 'bg-yellow-100 text-yellow-800';
    if (streakCount >= 7) return 'bg-gray-200 text-gray-700';
    if (streakCount >= 3) return 'bg-amber-100 text-amber-800';
    return 'bg-green-100 text-green-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-serenspace-nude-light/50">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-serenspace-rose border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-serenspace-nude-light/50">
      <NavBar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
        <div className="mb-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-red-600"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* User Info Card */}
            <div className="serenspace-card p-6 animate-fade-in">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-serenspace-rose/20 flex items-center justify-center mr-4">
                    <User className="w-8 h-8 text-serenspace-rose" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{userProfile?.name}</h2>
                    <p className="text-gray-600">{userProfile?.email}</p>
                    {userProfile?.gender && (
                      <span className="text-sm text-gray-500 capitalize">{userProfile.gender}</span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="serenspace-button-nude flex items-center"
                >
                  {editMode ? (
                    <>
                      <Save className="w-4 h-4 mr-1" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </>
                  )}
                </button>
              </div>
              
              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="serenspace-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="serenspace-input w-full"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-binary</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-700 mb-2">Trusted Contact</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          name="trustedContactName"
                          value={formData.trustedContactName}
                          onChange={handleChange}
                          className="serenspace-input w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="trustedContactEmail"
                          value={formData.trustedContactEmail}
                          onChange={handleChange}
                          className="serenspace-input w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone (optional)
                        </label>
                        <input
                          type="tel"
                          name="trustedContactPhone"
                          value={formData.trustedContactPhone}
                          onChange={handleChange}
                          className="serenspace-input w-full"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveProfile}
                      className="serenspace-button-primary"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {userProfile?.trustedContact && (
                    <div className="mt-4">
                      <h3 className="text-md font-medium text-gray-700 mb-2">Trusted Contact</h3>
                      <div className="bg-serenspace-nude/10 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <User className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-gray-800">{userProfile.trustedContact.name}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <Mail className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-gray-800">{userProfile.trustedContact.email}</span>
                        </div>
                        {userProfile.trustedContact.phone && (
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-gray-800">{userProfile.trustedContact.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Streaks and Stats */}
            <div className="serenspace-card p-6 animate-fade-in delay-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Award className="mr-2 text-serenspace-sage" size={20} />
                Your Stats
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-serenspace-rose/10 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-serenspace-rose-dark">
                    {userProfile?.streaks?.journal || 0}
                  </div>
                  <div className="text-sm text-gray-600">Journal Streak</div>
                </div>
                
                <div className="bg-serenspace-sage/10 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-serenspace-sage-dark">
                    {userProfile?.streaks?.selfCare || 0}
                  </div>
                  <div className="text-sm text-gray-600">Self-care Streak</div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-700">Your Badges</h3>
                  <span className="text-sm text-gray-500">Based on your streaks</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-serenspace-rose-light flex items-center justify-center mr-3">
                        <BookOpen className="w-5 h-5 text-serenspace-rose" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Journal Badge</div>
                        <div className="text-sm text-gray-500">
                          {userProfile?.streaks?.journal 
                            ? `${userProfile?.streaks?.journal} day streak` 
                            : 'No streak yet'}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(userProfile?.streaks?.journal || 0)}`}>
                      {getBadgeName(userProfile?.streaks?.journal || 0)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-serenspace-sage-light flex items-center justify-center mr-3">
                        <Heart className="w-5 h-5 text-serenspace-sage" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Self-care Badge</div>
                        <div className="text-sm text-gray-500">
                          {userProfile?.streaks?.selfCare 
                            ? `${userProfile?.streaks?.selfCare} day streak` 
                            : 'No streak yet'}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(userProfile?.streaks?.selfCare || 0)}`}>
                      {getBadgeName(userProfile?.streaks?.selfCare || 0)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-700">Journal Entries</h3>
                  <span className="text-sm bg-serenspace-rose/10 px-2 py-1 rounded text-serenspace-rose-dark">
                    {journalCount} {journalCount === 1 ? 'entry' : 'entries'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Side Content */}
          <div className="space-y-6">
            {/* Period Tracking (if female) */}
            {userProfile?.periodTracking?.enabled && (
              <div className="serenspace-card p-6 animate-fade-in delay-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Calendar className="mr-2 text-pink-500" size={20} />
                  Period Calendar
                </h2>
                
                <CalendarComponent
                  mode="single"
                  onSelect={() => {}}
                  disabled={(date) => date > new Date()}
                  className="rounded-md border"
                />
                
                <div className="mt-4 text-center">
                  <button className="text-sm text-serenspace-rose-dark hover:underline">
                    Update Period Info
                  </button>
                </div>
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="serenspace-card p-6 animate-fade-in delay-300">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 bg-serenspace-nude/10 rounded-lg hover:bg-serenspace-nude/20 transition-colors">
                  Export Journal Entries
                </button>
                <button className="w-full text-left px-3 py-2 bg-serenspace-sage/10 rounded-lg hover:bg-serenspace-sage/20 transition-colors">
                  View Progress Report
                </button>
                <button className="w-full text-left px-3 py-2 bg-serenspace-rose/10 rounded-lg hover:bg-serenspace-rose/20 transition-colors">
                  Privacy Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
