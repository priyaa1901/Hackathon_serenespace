
import React, { useEffect, useState } from 'react';
import { Calendar, CalendarDays } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { getCurrentUser, updateUser } from '../utils/auth';
import { toast } from 'sonner';

const PeriodTracker: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [lastPeriod, setLastPeriod] = useState<Date | undefined>(undefined);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [currentPhase, setCurrentPhase] = useState('');
  const [daysUntilNext, setDaysUntilNext] = useState(0);

  useEffect(() => {
    const loadPeriodData = async () => {
      const user = await getCurrentUser();
      if (user && user.periodTracking) {
        setIsEnabled(user.periodTracking.enabled);
        
        if (user.periodTracking.lastPeriod) {
          setLastPeriod(new Date(user.periodTracking.lastPeriod));
        }
        
        if (user.periodTracking.cycleLength) {
          setCycleLength(user.periodTracking.cycleLength);
        }
        
        if (user.periodTracking.periodLength) {
          setPeriodLength(user.periodTracking.periodLength);
        }
      }
    };
    
    loadPeriodData();
  }, []);

  useEffect(() => {
    if (isEnabled && lastPeriod) {
      calculateCurrentPhase();
    }
  }, [isEnabled, lastPeriod, cycleLength, periodLength]);

  const calculateCurrentPhase = () => {
    if (!lastPeriod) return;
    
    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24));
    const dayInCycle = daysSinceLastPeriod % cycleLength;
    
    if (dayInCycle < periodLength) {
      setCurrentPhase('menstruation');
      setDaysUntilNext(0);
    } else if (dayInCycle < 14) {
      setCurrentPhase('follicular');
      setDaysUntilNext(14 - dayInCycle);
    } else if (dayInCycle < 17) {
      setCurrentPhase('ovulation');
      setDaysUntilNext(cycleLength - dayInCycle);
    } else {
      setCurrentPhase('luteal');
      setDaysUntilNext(cycleLength - dayInCycle);
    }
  };

  const handleLastPeriodChange = async (date: Date | undefined) => {
    if (!date) return;
    
    setLastPeriod(date);
    
    try {
      await updateUser({
        periodTracking: {
          enabled: isEnabled,
          lastPeriod: date,
          cycleLength,
          periodLength
        }
      });
      
      toast('Period date updated');
    } catch (error) {
      console.error('Error updating period date:', error);
      toast('Failed to update period date');
    }
  };

  const handleCycleLengthChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCycleLength(value);
    
    try {
      await updateUser({
        periodTracking: {
          enabled: isEnabled,
          lastPeriod,
          cycleLength: value,
          periodLength
        }
      });
    } catch (error) {
      console.error('Error updating cycle length:', error);
    }
  };

  const handlePeriodLengthChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPeriodLength(value);
    
    try {
      await updateUser({
        periodTracking: {
          enabled: isEnabled,
          lastPeriod,
          cycleLength,
          periodLength: value
        }
      });
    } catch (error) {
      console.error('Error updating period length:', error);
    }
  };

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="rounded-full p-3 bg-pink-400 hover:bg-pink-500 text-white shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
          >
            <Calendar size={24} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4 p-2">
            <h3 className="font-semibold text-lg">Period Tracker</h3>
            
            {currentPhase && (
              <div className="bg-pink-50 p-3 rounded-md">
                <p className="font-medium">Current phase: <span className="text-pink-600 capitalize">{currentPhase}</span></p>
                {currentPhase !== 'menstruation' && daysUntilNext > 0 && (
                  <p className="text-sm text-gray-600">
                    {currentPhase === 'follicular' || currentPhase === 'ovulation' 
                      ? `Ovulation in approximately ${daysUntilNext} days` 
                      : `Period expected in approximately ${daysUntilNext} days`}
                  </p>
                )}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">Last period start date</label>
              <CalendarComponent
                mode="single"
                selected={lastPeriod}
                onSelect={handleLastPeriodChange}
                className="border rounded-md"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Cycle length (days)</label>
                <input
                  type="number"
                  min="21"
                  max="35"
                  value={cycleLength}
                  onChange={handleCycleLengthChange}
                  className="w-full serenspace-input"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Period length (days)</label>
                <input
                  type="number"
                  min="3"
                  max="7"
                  value={periodLength}
                  onChange={handlePeriodLengthChange}
                  className="w-full serenspace-input"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PeriodTracker;
