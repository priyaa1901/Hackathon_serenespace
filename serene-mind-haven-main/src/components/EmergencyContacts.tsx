
import React from 'react';
import { Phone, AlertTriangle, Info } from 'lucide-react';

const EmergencyContacts: React.FC = () => {
  const helplines = [
    {
      name: 'National Suicide Prevention Lifeline (KIRAN)',
      number: '1800-599-0019',
      description: '24/7 toll-free mental health rehabilitation helpline'
    },
    {
      name: 'National Emergency Number',
      number: '112',
      description: 'For any emergency service (Police, Fire, Ambulance)'
    },
    {
      name: 'Women Helpline',
      number: '1091',
      description: 'For women in distress'
    },
    {
      name: 'Child Helpline',
      number: '1098',
      description: 'For children in distress'
    },
    {
      name: 'Mental Health Helpline (NIMHANS)',
      number: '080-26661337',
      description: 'For mental health support'
    }
  ];

  const safetyTips = [
    'If you\'re feeling suicidal, remove any means of harm from your vicinity',
    'Create a safety plan with emergency contacts and coping strategies',
    'Reach out to a trusted person or professional immediately',
    'Remember that feelings are temporary and help is available',
    'Practice grounding techniques - focus on your five senses',
    'Call a crisis helpline - they\'re trained to help'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Phone className="mr-2 text-serenspace-rose" size={20} />
          Emergency Helplines (India)
        </h2>
        <div className="space-y-3">
          {helplines.map((helpline, index) => (
            <div key={index} className="serenspace-card p-4">
              <h3 className="font-medium text-gray-800">{helpline.name}</h3>
              <p className="text-xl font-bold text-serenspace-rose-dark my-1">{helpline.number}</p>
              <p className="text-sm text-gray-600">{helpline.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <AlertTriangle className="mr-2 text-serenspace-sage" size={20} />
          Safety Tips
        </h2>
        <div className="serenspace-card p-4">
          <ul className="space-y-2">
            {safetyTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-serenspace-rose mr-2 mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start">
        <Info className="text-blue-500 mr-2 flex-shrink-0 mt-1" size={20} />
        <p className="text-blue-700 text-sm">
          In case of immediate danger to yourself or others, please call emergency services at <strong>112</strong> immediately.
          Do not delay seeking help in a crisis situation.
        </p>
      </div>
    </div>
  );
};

export default EmergencyContacts;
