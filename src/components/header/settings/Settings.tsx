import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthButton from '@/components/header/auth/AuthButton';

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
  const [activeTab, setActiveTab] = useState<'account' | 'chat' | 'privacy' | 'tos'>('account');
  const [formData, setFormData] = useState(userData);
  const [customInstructions, setCustomInstructions] = useState(`You are a highly skilled chemist...`);
  const [hasChanges, setHasChanges] = useState(false);
  
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const handleSave = async () => {
    try {
      const settingsData = {
        account: {
          ...formData
        },
        chat: {
          customInstructions
        }
      };

      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsData)
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setHasChanges(false);
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      // Optionally add error handling UI feedback here
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      setHasChanges(true);
      return newData;
    });
  };

  const handleBirthdayChange = (value: string) => {
    const [month, day, year] = value.split('/');
    setFormData(prev => {
      const newData = {
        ...prev,
        birthday: { month, day, year }
      };
      setHasChanges(true);
      return newData;
    });
  };

  if (!isOpen) return null;

  const renderAccountSettings = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-4"
    >
      <div>
        <label className="block text-overline text-text-secondary mb-2">FULL NAME</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          className="w-full p-3 bg-surface-main rounded-lg text-body-regular text-text-primary focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-overline text-text-secondary mb-2">EMAIL</label>
        <input
          type="email"
          value={formData.email}
          disabled={true}
          className="w-full p-3 bg-surface-main rounded-lg text-body-regular text-text-secondary focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-overline text-text-secondary mb-2">BIRTHDAY</label>
        <div className="relative flex items-center">
          <input
            type="text"
            value={`${formData.birthday.month}/${formData.birthday.day}/${formData.birthday.year}`}
            onChange={(e) => handleBirthdayChange(e.target.value)}
            placeholder="MM/DD/YYYY"
            className="w-full p-3 bg-surface-main rounded-sm text-body-regular text-text-primary focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-overline text-text-secondary mb-2">COMPANY</label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          className="w-full p-3 bg-surface-main rounded-sm text-body-regular text-text-secondary focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-overline text-text-secondary mb-2">OCCUPATION</label>
        <input
          type="text"
          value={formData.occupation}
          onChange={(e) => handleInputChange('occupation', e.target.value)}
          className="w-full p-3 bg-surface-main rounded-sm text-body-regular text-text-secondary focus:outline-none"
        />
      </div>

      <button className="mt-4 w-auto p-3 bg-surface-main text-body-regular text-text-primary rounded-sm hover:bg-gray-100 transition-colors text-left">
        Delete Account
      </button>
    </motion.div>
  );

  const renderChatSettings = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-overline text-text-secondary mb-2">CUSTOM INSTRUCTIONS</label>
        <textarea
          className="w-full p-3 bg-surface-main rounded-md h-[300px] text-body-regular"
          value={customInstructions}
          onChange={(e) => {
            setCustomInstructions(e.target.value);
            setHasChanges(true);
          }}
        />
      </div>
    </motion.div>
  );

  const renderPrivacyPolicy = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-4 text-text-secondary text-body-regular"
    >
      <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Tempor consequat suspendisse nostra, lacinia facilisis odio montes tincidunt. Sit pharetra feugiat eros ex leo tempus sociosqu. Aptent sit quam risus vehicula cursus lobortis; ullamcorper quis. Dolor molestie eget himenaeos sagittis sapien accumsan ultricies. Arcu etiam lacus dapibus nec vitae semper nullam suscipit.</p>
      <p>Rutrum habitant curae tristique non magna montes. Quisque feugiat eget sit mollis enim primis tempus nam. Auctor blandit diam euismod risus pretium laoreet. Aenean nostra per mollis, efficitur a fermentum porta auctor vivamus. Ligula inceptos lectus nec curae vehicula aliquet dolor nec. Sit netus et aptent nisl conubia ante class dolor. Pulvinar auctor platea aliquam diam a faucibus montes?</p>
      <p>Dis aenean pharetra condimentum mollis sociosqu rutrum. Nisi quam praesent at hendrerit cursus habitant. Netus quisque erat ad montes tempus habitasse vivamus. Facilisis ullamcorper urna morbi maecenas donec fusce convallis. Suspendisse curae metus iaculis vitae euismod. Velit pulvinar aliquam posuere malesuada pharetra vel; libero facilisi. Fames eu curae aliquam vivamus sagittis dictumst luctus tempor.</p>
      <p>Parturient auctor nibh mi auctor tortor. Massa porttitor faucibus placerat eleifend sem ridiculus congue fusce. Nam facilisi tempus ullamcorper cubilia iaculis curae. Maximus velit posuere orci pharetra; consequat quam taciti sagittis himenaeos. Et donec curae dictumst potenti per sollicitudin laoreet nostra fermentum. Venenatis imperdiet cursus nibh; vivamus finibus rutrum et facilisis.</p>
      <p>Magnis vel fermentum et phasellus enim elementum dui conubia diam. Per malesuada placerat gravida sem tincidunt enim lectus. Viverra cras rutrum vel dui; lorem vulputate finibus feugiat. Magna vitae duis odio vitae laoreet lorem ligula ex. Praesent dui faucibus magna euismod fermentum lacus. Mattis nibh eros habitasse ex hac. Pharetra molestie quisque quisque nostra; mattis dolor habitant. Sapien pulvinar pretium erat vestibulum dapibus himenaeos curabitur in nascetur. Orci consectetur suscipit pharetra elementum magna auctor vestibulum.</p>
    </motion.div>
  );

  const renderTermsOfService = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-4 text-text-secondary text-body-regular"
    >
      <p>By using HumanChem, you agree to these Terms of Service. We provide a computational chemistry analysis tool "as is" without any warranties.</p>
      <p>You are responsible for any content you submit to HumanChem. Do not use the service for illegal purposes or to analyze prohibited substances. We reserve the right to terminate accounts that violate these terms.</p>
      <p>We may update these terms at any time. Your continued use of HumanChem after changes constitutes acceptance of the updated terms. For questions about these terms, please contact us.</p>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-surface-backdrops flex items-center justify-center z-50 p-10"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-surface-background rounded-md shadow-lg w-3/5 h-3/5 flex overflow-hidden max-h-[90vh]"
          >
            {/* Sidebar */}
            <div className="w-1/4 bg-surface-background flex flex-col">
              <div className="p-4 flex items-start">
                <img src="/hcc.png" alt="HCC Logo" className='w-6 h-6' />
              </div>
              <hr className='text-border-default'/>
              
              <nav>
                <button 
                  onClick={() => setActiveTab('account')}
                  className={`w-full text-left text-body-regular text-text-primary py-2 rounded ${activeTab === 'account' ? 'bg-fill-secondary' : ''}`}
                >
                  <span className='mx-2'>Account Settings</span>
                </button>
                <hr className='text-border-default'/>

                <button 
                  onClick={() => setActiveTab('chat')}
                  className={`w-full text-left text-body-regular text-text-primary py-2 rounded ${activeTab === 'chat' ? 'bg-fill-secondary' : ''}`}
                >
                  <span className='mx-2'>Chat Settings</span>
                </button>
              </nav>
              <hr className='text-border-default'/>

              {/* Bottom section */}
              <div className="mt-auto">
                <div className="pt-2 bg-surface-main m-2 rounded-lg">
                  <div className="text-body-regular-12 text-text-secondary px-3">
                    Get unlimited responses, favorites, and extended chat history with <span className="text-purple-500">PRO</span>
                  </div>
                  <div className="text-body-regular-12 text-text-secondary mt-3 px-3">
                    Starting at <span className="text-text-primary">$15/month</span>
                  </div>
                  <button className="w-full mt-2 py-2 bg-black text-text-primary-button text-body-regular rounded-sm">
                    Upgrade
                  </button>
                </div>

                <hr className='text-border-default'/>
                <div className="mt-2 flex items-center gap-2 px-3">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="text-body-regular text-text-primary">{formData.email}</span>
                </div>

                <div className="pt-2 text-body-regular">
                  <hr className='text-border-default'/>
                  <button 
                    onClick={() => setActiveTab('privacy')}
                    className={`block w-full text-left px-3 py-2 text-text-secondary hover:bg-fill-secondary transition-colors ${activeTab === 'privacy' ? 'bg-fill-secondary' : ''}`}
                  >
                    Privacy Policy
                  </button>
                  <button 
                    onClick={() => setActiveTab('tos')}
                    className={`block w-full text-left px-3 py-2 text-text-secondary hover:bg-fill-secondary transition-colors ${activeTab === 'tos' ? 'bg-fill-secondary' : ''}`}
                  >
                    Terms of Service
                  </button>
                  <hr className='text-border-default'/>
                  <div className="block w-full text-left px-3 my-1">
                    <AuthButton/>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 border-l flex flex-col">
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-center">
                  <h1 className="text-heading text-text-primary">
                    {activeTab === 'account' && 'Account Settings'}
                    {activeTab === 'chat' && 'Chat Settings'}
                    {activeTab === 'privacy' && 'Privacy Policy'}
                    {activeTab === 'tos' && 'Terms of Service'}
                  </h1>
                  <div className="flex space-x-2">
                    {activeTab !== 'privacy' && activeTab !== 'tos' && (
                      <button 
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className={`px-3 py-2 rounded-sm text-body-regular text-text-primary ${
                          hasChanges ? 'bg-fill-primary text-text-primary-button' : 'bg-fill-secondary'
                        }`}
                      >
                        Save
                      </button>
                    )}
                    <button 
                      onClick={onClose}
                      className="px-3 py-2 bg-fill-secondary rounded-sm text-body-regular text-text-primary"
                    >
                      Close
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 flex-1 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {activeTab === 'account' && renderAccountSettings()}
                    {activeTab === 'chat' && renderChatSettings()}
                    {activeTab === 'privacy' && renderPrivacyPolicy()}
                    {activeTab === 'tos' && renderTermsOfService()}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Settings;