
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Shield, MessageSquare, Heart, Brain } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-serenspace-nude-light via-white to-serenspace-rose-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-800">
                Find peace in your
                <span className="text-serenspace-rose-dark"> mental journey</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-600">
                Your personal companion for mindfulness, emotional support, and mental wellbeing.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="serenspace-button-primary flex items-center justify-center"
                >
                  <span>Sign In</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/signup"
                  className="serenspace-button-nude flex items-center justify-center"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-serenspace-sage via-serenspace-nude to-serenspace-rose opacity-20 blur-xl animate-breathe"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-white shadow-xl overflow-hidden p-4">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-serenspace-sage to-serenspace-rose-light flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">SerenSpace</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Nurture Your Mental Wellbeing
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="serenspace-card p-6 animate-fade-in delay-100">
              <div className="w-12 h-12 rounded-full bg-serenspace-rose/20 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-serenspace-rose-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Companion</h3>
              <p className="text-gray-600">
                A supportive AI chatbot that listens, understands, and provides guidance tailored to your emotional needs.
              </p>
            </div>
            
            <div className="serenspace-card p-6 animate-fade-in delay-200">
              <div className="w-12 h-12 rounded-full bg-serenspace-sage/20 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-serenspace-sage-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mood Tracking</h3>
              <p className="text-gray-600">
                Track and visualize your emotional journey with our intuitive mood tracking tools to identify patterns.
              </p>
            </div>
            
            <div className="serenspace-card p-6 animate-fade-in delay-300">
              <div className="w-12 h-12 rounded-full bg-serenspace-nude/20 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-serenspace-nude-dark" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Self-Care Activities</h3>
              <p className="text-gray-600">
                Discover personalized self-care activities based on your mood, preferences, and needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-serenspace-nude-light">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Stories of Transformation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 relative animate-fade-in">
              <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-serenspace-rose flex items-center justify-center text-white">
                "
              </div>
              <p className="text-gray-600 mb-4 mt-2">
                "SerenSpace has been my daily companion through anxiety. The chatbot feels like talking to a friend who really listens."
              </p>
              <div className="font-medium">Emily, 28</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 relative animate-fade-in delay-100">
              <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-serenspace-sage flex items-center justify-center text-white">
                "
              </div>
              <p className="text-gray-600 mb-4 mt-2">
                "The mood tracking has helped me identify triggers I wasn't even aware of. Life-changing for my mental health journey."
              </p>
              <div className="font-medium">Marcus, 35</div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 relative animate-fade-in delay-200">
              <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-serenspace-nude flex items-center justify-center text-white">
                "
              </div>
              <p className="text-gray-600 mb-4 mt-2">
                "I love the journaling feature. Being able to look back at my progress gives me strength on difficult days."
              </p>
              <div className="font-medium">Sophia, 42</div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Your Privacy Is Our Priority
              </h2>
              <p className="text-gray-600 mb-6">
                We understand the sensitivity of mental health data. That's why SerenSpace is built with your privacy and security at its core.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-serenspace-rose flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">End-to-end encryption for all your data</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-serenspace-rose flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">You control who has access to your information</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-serenspace-rose flex items-center justify-center text-white">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="ml-3 text-gray-600">Compliant with global data protection regulations</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 relative animate-fade-in">
                <div className="absolute inset-0 rounded-full bg-serenspace-rose/20 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="w-24 h-24 text-serenspace-rose" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-serenspace-sage/30 to-serenspace-rose/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Begin Your Journey to Better Mental Health
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands who've found comfort, support, and growth with SerenSpace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="serenspace-button-primary flex items-center justify-center"
            >
              Create Free Account
            </Link>
            <Link
              to="/login"
              className="serenspace-button-nude flex items-center justify-center"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-serenspace-rose to-serenspace-sage flex items-center justify-center mr-2">
                  <span className="text-white font-semibold">S</span>
                </div>
                <span className="text-xl font-semibold text-gray-800">SerenSpace</span>
              </div>
              <p className="mt-2 text-sm text-gray-600 max-w-md">
                Your companion for mindfulness, emotional support, and mental wellbeing.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800">Help Center</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800">Safety Guidelines</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800">Crisis Resources</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800">Privacy Policy</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800">Terms of Service</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800">Cookie Policy</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800">About Us</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800">Blog</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-gray-800">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} SerenSpace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
