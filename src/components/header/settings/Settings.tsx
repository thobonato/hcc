import React, { useState } from 'react';
import Logo from '@/components/initial/Logo';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: {
    fullName: string;
    email: string;
    birthday: {
      month: string;
      day: string;
      year: string;
    };
    company: string;
    occupation: string;
  };
}

const Settings: React.FC<SettingsProps> = ({ 
  isOpen, 
  onClose, 
  userData = {
    fullName: 'Liam Fennell',
    email: 'info@fennell.cv',
    birthday: {
      month: '03',
      day: '15',
      year: '2002'
    },
    company: 'OpenPurpose®',
    occupation: 'Product Designer'
  }
}) => {
  const [activeTab, setActiveTab] = useState<'account' | 'chat' | 'privacy'>('account');
  
  if (!isOpen) return null;

  const renderAccountSettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-overline text-text-secondary mb-2">FULL NAME</label>
        <input
          type="text"
          value={userData.fullName}
          className="w-full p-3 bg-surface-main rounded-lg"
        />
      </div>

    <div>
      <label className="block text-overline text-text-secondary mb-2">EMAIL</label>
      <input
        type="email"
        value={userData.email}
        disabled={true}
        className="w-full p-3 bg-surface-main rounded-lg text-body-regular text-text-secondary"
      />
    </div>

      <div>
        <label className="block text-overline text-text-secondary mb-2">BIRTHDAY</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={userData.birthday.month}
            className="w-16 p-3 bg-surface-main rounded-lg"
          />
          <span className="text-xl self-center">/</span>
          <input
            type="text"
            value={userData.birthday.day}
            className="w-16 p-3 bg-surface-main rounded-lg"
          />
          <span className="text-xl self-center">/</span>
          <input
            type="text"
            value={userData.birthday.year}
            className="w-24 p-3 bg-surface-main rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-overline text-text-secondary mb-2">COMPANY</label>
        <input
          type="text"
          value={userData.company}
          className="w-full p-3 bg-surface-main rounded-lg"
        />
      </div>

      <div>
        <label className="block text-overline text-text-secondary mb-2">OCCUPATION</label>
        <input
          type="text"
          value={userData.occupation}
          className="w-full p-3 bg-surface-main rounded-lg"
        />
      </div>

      <button className="mt-4 w-full p-3 bg-surface-main text-black rounded-lg hover:bg-gray-100 transition-colors text-left">
        Delete Account
      </button>
    </div>
  );

  const renderChatSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-overline text-text-secondary mb-2">CUSTOM INSTRUCTIONS</label>
        <textarea
          className="w-full p-3 bg-gray-50 rounded-lg h-96"
          value={`You are a highly skilled chemist specializing in computational chemistry and molecular modeling. Analyze the following SMILES string and provide a detailed breakdown.

1. Identify the molecule's IUPAC name, molecular formula, and key structural features.
2. Predict its physical and chemical properties, including molecular weight, logP, pKa, and aqueous solubility.
3. Evaluate its biological and pharmacological profile, including blood-brain barrier permeability, CYP450 inhibition, and potential bioactivity.
4. Assess its safety risks, including acute toxicity (GHS classification), carcinogenicity, and hERG channel inhibition.
5. If provided with a target protein (PDB ID), estimate the molecular docking score and describe key binding interactions.
6. Provide insights into its synthetic accessibility and the presence of reactive functional groups.
7. Return the information in a structured JSON format.

SMILES: {smiles_string}
Target Protein (optional): {pdb_id}`}
        />
      </div>
    </div>
  );

  const renderPrivacyPolicy = () => (
    <div className="space-y-4 text-gray-500">
      <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Tempor consequat suspendisse nostra, lacinia facilisis odio montes tincidunt. Sit pharetra feugiat eros ex leo tempus sociosqu. Aptent sit quam risus vehicula cursus lobortis; ullamcorper quis. Dolor molestie eget himenaeos sagittis sapien accumsan ultricies. Arcu etiam lacus dapibus nec vitae semper nullam suscipit.</p>
      
      <p>Rutrum habitant curae tristique non magna montes. Quisque feugiat eget sit mollis enim primis tempus nam. Auctor blandit diam euismod risus pretium laoreet. Aenean nostra per mollis, efficitur a fermentum porta auctor vivamus. Ligula inceptos lectus nec curae vehicula aliquet dolor nec. Sit netus et aptent nisl conubia ante class dolor. Pulvinar auctor platea aliquam diam a faucibus montes?</p>
      
      <p>Dis aenean pharetra condimentum mollis sociosqu rutrum. Nisi quam praesent at hendrerit cursus habitant. Netus quisque erat ad montes tempus habitasse vivamus. Facilisis ullamcorper urna morbi maecenas donec fusce convallis.</p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-surface-backdrops flex items-center justify-center z-50 p-10">
      <div className="bg-surface-background rounded-xl shadow-lg w-3/5 h-3/5 flex overflow-hidden max-h-[90vh]">
        <div className="w-64 bg-surface-background flex flex-col">
          <div className="p-4 flex items-start">
            <Logo className='w-12 h-12' />
          </div>
          <hr className='text-border-default'/>
        
        {/* Account */}
          <nav>
            <button 
              onClick={() => setActiveTab('account')}
              className={`w-full text-left py-2 rounded ${activeTab === 'account' ? 'bg-fill-secondary' : ''}`}
            >
            <span className='mx-2'>Account Settings</span>
            </button>
            <hr className='text-border-default'/>

            {/* Chat */}
            <button 
              onClick={() => setActiveTab('chat')}
              className={`w-full text-left py-2 rounded ${activeTab === 'chat' ? 'bg-fill-secondary' : ''}`}
            >
              <span className='mx-2'>Chat Settings</span>
            </button>
          </nav>
          <hr className='text-border-default'/>
  
          <div className="mt-auto pb-6">
            <div className="pt-4 bg-surface-main m-2 rounded-lg">
              <div className="text-sm text-text-secondary px-6">
                Get unlimited responses, favorites, and extended chat history with <span className="text-purple-500">PRO</span>
              </div>
              <div className="text-sm text-text-secondary mt-1 px-6">
                Starting at <span className="font-medium">$15/month</span>
              </div>
              <button className="w-full mt-2 py-2 bg-black text-white rounded-lg">
                Upgrade
              </button>
            </div>

            <hr className='text-border-default'/>
            <div className="mt-4 flex items-center space-x-2 text-sm px-6">
              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
              <span>{userData.email}</span>
            </div>
  
            <div className="mt-4 space-y-2 text-body-regular text-text-secondary">
            <hr className='text-border-default'/>
              <button 
                onClick={() => setActiveTab('privacy')}
                className={`block w-full text-left px-6 ${activeTab === 'privacy' ? 'text-gray-900' : ''}`}
              >
                Privacy Policy
              </button>
              <hr className='text-border-default'/>
              <button className="block w-full text-left px-6">Terms of Service</button>
              <hr className='text-border-default'/>
              <button className="block w-full text-left px-6">Logout</button>
            </div>
          </div>
        </div>
  
        <div className="flex-1 border-l">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-normal">
                {activeTab === 'account' && 'Account Settings'}
                {activeTab === 'chat' && 'Chat Settings'}
                {activeTab === 'privacy' && 'Privacy Policy'}
              </h1>
              <div className="flex space-x-2">
                {activeTab !== 'privacy' && (
                  <button className="px-4 py-2 bg-fill-secondary rounded-lg">
                    Save
                  </button>
                )}
                <button 
                  onClick={onClose}
                  className="px-4 py-2 bg-fill-secondary rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
            
            <div className="mt-6 overflow-y-auto">
              {activeTab === 'account' && renderAccountSettings()}
              {activeTab === 'chat' && renderChatSettings()}
              {activeTab === 'privacy' && renderPrivacyPolicy()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;