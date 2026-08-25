import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { portfolioAPIService, PortfolioData } from '../../services/PortfolioAPIService';

interface OutletContextType {
  portfolioData: PortfolioData;
  refreshData: () => Promise<void>;
}

interface EducationType {
  _id?: string;
  icon: string;
  year: string;
  title: string;
  institution: string;
}

export const DashboardEducation = () => {
  const { portfolioData, refreshData } = useOutletContext<OutletContextType>();
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [editingEducation, setEditingEducation] = useState<EducationType | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleStartAdd = () => {
    setEditingEducation({
      icon: '🎓',
      year: '',
      title: '',
      institution: ''
    });
    setIsNew(true);
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleStartEdit = (edu: EducationType) => {
    setEditingEducation({ ...edu });
    setIsNew(false);
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleFieldChange = (key: keyof EducationType, value: string) => {
    if (!editingEducation) return;
    setEditingEducation(prev => {
      if (!prev) return null;
      return { ...prev, [key]: value };
    });
  };

  const handleDelete = async (eduId: string) => {
    if (!window.confirm('Are you sure you want to delete this education entry?')) return;
    setIsSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const updatedEducation = portfolioData.education.filter(e => e._id !== eduId);
      const response = await portfolioAPIService.updatePortfolioData({
        education: updatedEducation
      });

      if (response.success) {
        setSuccessMsg('Education entry deleted successfully!');
        await refreshData();
      } else {
        setErrorMsg(response.messages?.[0] || 'Failed to delete entry');
      }
    } catch (err) {
      setErrorMsg('A network error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEducation) return;
    setIsSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      let updatedEducation = [...portfolioData.education];

      if (isNew) {
        updatedEducation.push(editingEducation);
      } else {
        updatedEducation = updatedEducation.map(e => e._id === editingEducation._id ? editingEducation : e);
      }

      const response = await portfolioAPIService.updatePortfolioData({
        education: updatedEducation
      });

      if (response.success) {
        setSuccessMsg(isNew ? 'Education entry added successfully!' : 'Education entry updated successfully!');
        setEditingEducation(null);
        await refreshData();
      } else {
        setErrorMsg(response.messages?.[0] || 'Failed to save entry');
      }
    } catch (err) {
      setErrorMsg('A network error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Academic Credentials</h1>
          <p className="text-sm text-slate-400">Manage your educational history, schools, and degrees.</p>
        </div>
        {!editingEducation && (
          <button
            onClick={handleStartAdd}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-5 rounded-xl transition-all shadow-md text-sm"
          >
            + Add Education
          </button>
        )}
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

      {editingEducation ? (
        <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
            {isNew ? 'Add Education Entry' : 'Edit Education Details'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Icon Emoji</label>
              <input
                type="text"
                value={editingEducation.icon}
                onChange={(e) => handleFieldChange('icon', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Year Range / Year</label>
              <input
                type="text"
                value={editingEducation.year}
                onChange={(e) => handleFieldChange('year', e.target.value)}
                placeholder="2021 — 2025"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Degree / Course Title</label>
              <input
                type="text"
                value={editingEducation.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Institution / School Name</label>
            <input
              type="text"
              value={editingEducation.institution}
              onChange={(e) => handleFieldChange('institution', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div className="flex gap-3 pt-3 border-t border-slate-800">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md text-sm disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Entry'}
            </button>
            <button
              type="button"
              onClick={() => setEditingEducation(null)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 px-6 rounded-xl transition-all text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {portfolioData.education.map((edu) => (
            <div key={edu._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl bg-slate-950 p-2.5 rounded-xl border border-slate-850">{edu.icon || '🎓'}</span>
                <div>
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">{edu.year}</span>
                  <h4 className="text-base font-bold text-white leading-tight">{edu.title}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">{edu.institution}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStartEdit(edu)}
                  className="bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold py-2 px-4 rounded-xl transition-colors border border-slate-850"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(edu._id!)}
                  className="bg-red-500/10 border border-red-500/20 hover:bg-red-500 text-red-400 hover:text-white text-xs font-semibold py-2 px-4 rounded-xl transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardEducation;
