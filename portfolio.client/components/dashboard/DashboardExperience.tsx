import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { portfolioAPIService, PortfolioData } from '../../services/PortfolioAPIService';
import { useToast } from '../toast/ToastContext';
import { ConfirmModal } from '../modal/ConfirmModal';

interface OutletContextType {
  portfolioData: PortfolioData;
  refreshData: () => Promise<void>;
}

interface ExperienceType {
  _id?: string;
  company: string;
  period: string;
  role: string;
  bulletPoints: string[];
}

export const DashboardExperience = () => {
  const { portfolioData, refreshData } = useOutletContext<OutletContextType>();
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [bulletInput, setBulletInput] = useState('');

  const [editingExperience, setEditingExperience] = useState<ExperienceType | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Custom Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [expToDeleteId, setExpToDeleteId] = useState<string | null>(null);

  const handleStartAdd = () => {
    setEditingExperience({
      company: '',
      period: '',
      role: '',
      bulletPoints: []
    });
    setIsNew(true);
    setBulletInput('');
  };

  const handleStartEdit = (exp: ExperienceType) => {
    setEditingExperience({ ...exp });
    setIsNew(false);
    setBulletInput('');
  };

  const handleFieldChange = (key: keyof ExperienceType, value: any) => {
    if (!editingExperience) return;
    setEditingExperience(prev => {
      if (!prev) return null;
      return { ...prev, [key]: value };
    });
  };

  const handleAddBullet = (e: React.FormEvent) => {
    e.preventDefault();
    if (bulletInput.trim() && editingExperience) {
      handleFieldChange('bulletPoints', [...editingExperience.bulletPoints, bulletInput.trim()]);
      setBulletInput('');
    }
  };

  const handleRemoveBullet = (idxToRemove: number) => {
    if (!editingExperience) return;
    handleFieldChange('bulletPoints', editingExperience.bulletPoints.filter((_, i) => i !== idxToRemove));
  };

  const handleTriggerDelete = (expId: string) => {
    setExpToDeleteId(expId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!expToDeleteId) return;
    setIsSaving(true);

    try {
      const updatedExperience = portfolioData.experience.filter(e => e._id !== expToDeleteId);
      const response = await portfolioAPIService.updatePortfolioData({
        experience: updatedExperience
      });

      if (response.success) {
        showToast('Experience entry deleted successfully!', 'success');
        await refreshData();
      } else {
        showToast(response.messages?.[0] || 'Failed to delete entry', 'error');
      }
    } catch (err) {
      showToast('A network error occurred', 'error');
    } finally {
      setIsSaving(false);
      setDeleteModalOpen(false);
      setExpToDeleteId(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience) return;
    setIsSaving(true);

    try {
      let updatedExperience = [...portfolioData.experience];

      if (isNew) {
        updatedExperience.push(editingExperience);
      } else {
        updatedExperience = updatedExperience.map(e => e._id === editingExperience._id ? editingExperience : e);
      }

      const response = await portfolioAPIService.updatePortfolioData({
        experience: updatedExperience
      });

      if (response.success) {
        showToast(isNew ? 'Experience entry added successfully!' : 'Experience entry updated successfully!', 'success');
        setEditingExperience(null);
        await refreshData();
      } else {
        showToast(response.messages?.[0] || 'Failed to save entry', 'error');
      }
    } catch (err) {
      showToast('A network error occurred', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Professional Experience</h1>
          <p className="text-sm text-slate-500">Manage your employment history, roles, and major accomplishments.</p>
        </div>
        {!editingExperience && (
          <button
            onClick={handleStartAdd}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-5 rounded-xl transition-all shadow-md shadow-orange-600/10 text-sm cursor-pointer"
          >
            + Add Experience
          </button>
        )}
      </div>

      {editingExperience ? (
        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
            {isNew ? 'Add Experience Entry' : 'Edit Experience Details'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-505 uppercase tracking-wider">Company Name</label>
              <input
                type="text"
                value={editingExperience.company}
                onChange={(e) => handleFieldChange('company', e.target.value)}
                className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-505 uppercase tracking-wider">Job Role / Title</label>
              <input
                type="text"
                value={editingExperience.role}
                onChange={(e) => handleFieldChange('role', e.target.value)}
                className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-505 uppercase tracking-wider">Period / Duration</label>
              <input
                type="text"
                value={editingExperience.period}
                onChange={(e) => handleFieldChange('period', e.target.value)}
                placeholder="2024 — PRESENT"
                className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
                required
              />
            </div>
          </div>

          {/* Bullet Points Section */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-505 uppercase tracking-wider block">Job Achievements & Responsibilities</label>
            <div className="space-y-2 mb-3">
              {editingExperience.bulletPoints.map((bullet, idx) => (
                <div key={idx} className="flex gap-2 items-start bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-orange-500 font-bold shrink-0 mt-0.5">•</span>
                  <p className="flex-1 text-sm text-slate-600">{bullet}</p>
                  <button
                    type="button"
                    onClick={() => handleRemoveBullet(idx)}
                    className="text-xs text-red-500 font-semibold hover:text-red-400 shrink-0 select-none cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 max-w-2xl">
              <input
                type="text"
                value={bulletInput}
                onChange={(e) => setBulletInput(e.target.value)}
                placeholder="Implemented secure user auth using JWT..."
                className="flex-1 bg-slate-55 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-550/10 transition-all"
              />
              <button
                type="button"
                onClick={handleAddBullet}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-sm transition-colors border border-slate-200 cursor-pointer"
              >
                + Add Bullet
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-3 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md text-sm disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? 'Saving...' : 'Save Entry'}
            </button>
            <button
              type="button"
              onClick={() => setEditingExperience(null)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-6 rounded-xl transition-all text-sm cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {portfolioData.experience.map((exp) => (
            <div key={exp._id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-sm hover:border-slate-300 transition-all">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                  <div>
                    <span className="text-xs font-bold text-orange-605 uppercase tracking-wider">{exp.period}</span>
                    <h4 className="text-lg font-bold text-slate-900 leading-tight">{exp.role}</h4>
                    <p className="text-slate-550 text-sm mt-0.5">{exp.company}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStartEdit(exp)}
                      className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2 px-4 rounded-xl transition-all border border-slate-200 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleTriggerDelete(exp._id!)}
                      className="bg-red-50 border border-red-200 hover:bg-red-500 hover:text-white text-red-655 text-xs font-bold py-2 px-4 rounded-xl transition-all cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <ul className="list-disc pl-5 mt-4 space-y-2 text-sm text-slate-500">
                  {exp.bulletPoints.map((bp, i) => (
                    <li key={i} className="leading-relaxed">{bp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Professional Experience"
        message="Are you sure you want to delete this experience entry? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setExpToDeleteId(null);
        }}
      />
    </div>
  );
};

export default DashboardExperience;
