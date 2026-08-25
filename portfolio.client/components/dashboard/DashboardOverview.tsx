import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { portfolioAPIService, PortfolioData } from '../../services/PortfolioAPIService';

interface OutletContextType {
  portfolioData: PortfolioData;
  refreshData: () => Promise<void>;
}

export const DashboardOverview = () => {
  const { portfolioData, refreshData } = useOutletContext<OutletContextType>();
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    aboutMe: { ...portfolioData.aboutMe },
    contact: { ...portfolioData.contact }
  });

  const handleStatChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      aboutMe: {
        ...prev.aboutMe,
        stats: {
          ...prev.aboutMe.stats,
          [key]: value
        }
      }
    }));
  };

  const handleAboutMeChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      aboutMe: {
        ...prev.aboutMe,
        [key]: value
      }
    }));
  };

  const handleContactChange = (key: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [key]: value
      }
    }));
  };

  const handlePhraseChange = (index: number, value: string) => {
    const updatedPhrases = [...formData.aboutMe.typewriterPhrases];
    updatedPhrases[index] = value;
    handleAboutMeChange('typewriterPhrases', updatedPhrases);
  };

  const addPhrase = () => {
    handleAboutMeChange('typewriterPhrases', [...formData.aboutMe.typewriterPhrases, '']);
  };

  const removePhrase = (index: number) => {
    const updatedPhrases = formData.aboutMe.typewriterPhrases.filter((_, i) => i !== index);
    handleAboutMeChange('typewriterPhrases', updatedPhrases);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await portfolioAPIService.updatePortfolioData({
        aboutMe: formData.aboutMe,
        contact: formData.contact
      });

      if (response.success) {
        setSuccessMsg('Profile details updated successfully!');
        await refreshData();
      } else {
        setErrorMsg(response.messages?.[0] || 'Failed to update profile');
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'A network error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Overview & Profile Details</h1>
          <p className="text-sm text-slate-400">Update your bio information, hero typewriter highlights, stats, and coordinates.</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-xl transition-all shadow-md shadow-orange-600/10 text-sm disabled:opacity-50 self-start"
        >
          {isSaving ? 'Saving Changes...' : 'Save Profile Details'}
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm font-medium">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Bio & Slogans */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">About Me Info</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Role Title</label>
                <input
                  type="text"
                  value={formData.aboutMe.role}
                  onChange={(e) => handleAboutMeChange('role', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Degree/Education</label>
                <input
                  type="text"
                  value={formData.aboutMe.education}
                  onChange={(e) => handleAboutMeChange('education', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">College/Institution</label>
                <input
                  type="text"
                  value={formData.aboutMe.college}
                  onChange={(e) => handleAboutMeChange('college', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Graduation Year</label>
                <input
                  type="number"
                  value={formData.aboutMe.gradYear}
                  onChange={(e) => handleAboutMeChange('gradYear', parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bio Introduction</label>
              <textarea
                rows={4}
                value={formData.aboutMe.intro}
                onChange={(e) => handleAboutMeChange('intro', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500 resize-none"
                required
              />
            </div>
          </div>

          {/* Typewriter Phrases */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-lg font-bold text-white">Hero Typewriter Phrases</h3>
              <button
                type="button"
                onClick={addPhrase}
                className="text-xs bg-orange-600/10 text-orange-400 border border-orange-600/20 px-3 py-1 rounded-lg hover:bg-orange-600 hover:text-white transition-all font-semibold"
              >
                + Add Phrase
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.aboutMe.typewriterPhrases.map((phrase, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={phrase}
                    onChange={(e) => handlePhraseChange(idx, e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                    placeholder={`Phrase #${idx + 1}`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removePhrase(idx)}
                    className="p-2 border border-red-500/20 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-colors shrink-0"
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Stats & Contacts */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Contact Details</h3>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={formData.contact.name}
                onChange={(e) => handleContactChange('name', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</label>
              <input
                type="text"
                value={formData.contact.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</label>
              <input
                type="text"
                value={formData.contact.location}
                onChange={(e) => handleContactChange('location', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Available for Hire</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.contact.available}
                  onChange={(e) => handleContactChange('available', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-850 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 peer-checked:after:bg-white after:border-slate-350 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Hero Panel Stats</h3>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Experience (Years)</label>
                <input
                  type="text"
                  value={formData.aboutMe.stats.yearsExperience}
                  onChange={(e) => handleStatChange('yearsExperience', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Projects Shipped</label>
                <input
                  type="text"
                  value={formData.aboutMe.stats.projectsShipped}
                  onChange={(e) => handleStatChange('projectsShipped', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tech Stacks</label>
                <input
                  type="text"
                  value={formData.aboutMe.stats.techStacks}
                  onChange={(e) => handleStatChange('techStacks', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Curiosity Rating</label>
                <input
                  type="text"
                  value={formData.aboutMe.stats.curiosity}
                  onChange={(e) => handleStatChange('curiosity', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DashboardOverview;
