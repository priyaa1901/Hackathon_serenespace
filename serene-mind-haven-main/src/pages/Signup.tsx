
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { signup } from '../utils/auth';
import { toast } from 'sonner';

type Gender = 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';

const Signup: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [trustedContactName, setTrustedContactName] = useState('');
  const [trustedContactEmail, setTrustedContactEmail] = useState('');
  const [trustedContactPhone, setTrustedContactPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const passwordStrength = (): { strength: 'weak' | 'medium' | 'strong', message: string } => {
    if (password.length === 0) return { strength: 'weak', message: 'Enter a password' };
    if (password.length < 8) return { strength: 'weak', message: 'Password is too short' };
    if (/^[a-zA-Z0-9]+$/.test(password)) return { strength: 'medium', message: 'Add special characters for a stronger password' };
    return { strength: 'strong', message: 'Strong password' };
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      const { strength } = passwordStrength();
      if (strength === 'weak') {
        setError('Please use a stronger password');
        return;
      }
    }
    
    setError('');
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const trustedContact = trustedContactName 
        ? { 
            name: trustedContactName, 
            email: trustedContactEmail,
            phone: trustedContactPhone || undefined 
          } 
        : undefined;
      
      const user = await signup(
        name, 
        email, 
        password, 
        gender as Gender || undefined,
        trustedContact
      );
      
      if (user) {
        toast(`Welcome to SerenSpace, ${user.name}!`);
        navigate('/dashboard', { replace: true });
      } else {
        setError('Error creating account');
      }
    } catch (err) {
      setError('An error occurred during signup');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const { strength, message } = passwordStrength();
  
  const strengthColor = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500'
  }[strength];

  return (
    <div className="min-h-screen flex flex-col bg-serenspace-nude-light">
      <Link 
        to="/" 
        className="absolute top-4 left-4 p-2 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        <span>Back</span>
      </Link>
      
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">
          <div className="bg-white shadow-xl rounded-xl p-8 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-serenspace-rose to-serenspace-sage mb-4 animate-glow-pulse">
                <span className="text-2xl font-bold text-white">S</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Create your account</h2>
              <p className="text-gray-600 mt-2">Join SerenSpace and start your wellness journey</p>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="w-full">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-serenspace-rose' : 'bg-gray-200'} text-white`}>
                      {currentStep > 1 ? <Check size={16} /> : '1'}
                    </div>
                    <div className={`h-1 flex-1 mx-2 ${currentStep > 1 ? 'bg-serenspace-rose' : 'bg-gray-200'}`}></div>
                  </div>
                  <div className="text-xs mt-1 text-gray-600">Basic Info</div>
                </div>
                
                <div className="w-full">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-serenspace-rose' : 'bg-gray-200'} text-white`}>
                      {currentStep > 2 ? <Check size={16} /> : '2'}
                    </div>
                    <div className={`h-1 flex-1 mx-2 ${currentStep > 2 ? 'bg-serenspace-rose' : 'bg-gray-200'}`}></div>
                  </div>
                  <div className="text-xs mt-1 text-gray-600">Personal Details</div>
                </div>
                
                <div className="w-full">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-serenspace-rose' : 'bg-gray-200'} text-white`}>
                      3
                    </div>
                  </div>
                  <div className="text-xs mt-1 text-gray-600">Trusted Contact</div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {currentStep === 1 && (
              <form onSubmit={handleNextStep} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="serenspace-input w-full"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="serenspace-input w-full"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="serenspace-input w-full pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-1">
                      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full ${strengthColor}`} style={{ width: strength === 'weak' ? '33%' : strength === 'medium' ? '66%' : '100%' }}></div>
                      </div>
                      <p className="text-xs mt-1 text-gray-500">{message}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="serenspace-input w-full"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="serenspace-button-primary w-full"
                >
                  Continue
                </button>

                <div className="text-center text-gray-500">
                  <span>Already have an account? </span>
                  <Link to="/login" className="text-serenspace-rose-dark hover:underline">
                    Sign in
                  </Link>
                </div>
              </form>
            )}

            {currentStep === 2 && (
              <form onSubmit={handleNextStep} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Gender (optional)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'non-binary', label: 'Non-binary' },
                      { value: 'prefer-not-to-say', label: 'Prefer not to say' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                          gender === option.value 
                            ? 'border-serenspace-rose bg-serenspace-rose/5' 
                            : 'border-gray-200 hover:border-serenspace-rose/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={option.value}
                          checked={gender === option.value}
                          onChange={(e) => setGender(e.target.value as Gender)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                          gender === option.value 
                            ? 'border-serenspace-rose' 
                            : 'border-gray-300'
                        }`}>
                          {gender === option.value && (
                            <div className="w-3 h-3 rounded-full bg-serenspace-rose"></div>
                          )}
                        </div>
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {gender === 'female' && (
                    <p className="text-sm text-serenspace-rose-dark mt-2">
                      The period tracking feature will be enabled for female users.
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="serenspace-button-nude"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="serenspace-button-primary"
                  >
                    Continue
                  </button>
                </div>
              </form>
            )}

            {currentStep === 3 && (
              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      Trusted Contact (optional)
                    </div>
                    <p className="text-sm text-gray-500">
                      Add a trusted contact who can be notified in case of emergency. This step is optional but recommended.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="trustedContactName" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact name
                      </label>
                      <input
                        id="trustedContactName"
                        type="text"
                        value={trustedContactName}
                        onChange={(e) => setTrustedContactName(e.target.value)}
                        className="serenspace-input w-full"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="trustedContactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact email
                      </label>
                      <input
                        id="trustedContactEmail"
                        type="email"
                        value={trustedContactEmail}
                        onChange={(e) => setTrustedContactEmail(e.target.value)}
                        className="serenspace-input w-full"
                        placeholder="contact@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="trustedContactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact phone (optional)
                      </label>
                      <input
                        id="trustedContactPhone"
                        type="tel"
                        value={trustedContactPhone}
                        onChange={(e) => setTrustedContactPhone(e.target.value)}
                        className="serenspace-input w-full"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="serenspace-button-nude"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="serenspace-button-primary relative"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        Creating account...
                      </span>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
