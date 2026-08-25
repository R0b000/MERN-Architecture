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
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Credentials</h1>
          <p className="text-sm text-slate-500">Manage your educational history, schools, and degrees.</p>
        </div>
        {!editingEducation && (
          <button
            onClick={handleStartAdd}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-5 rounded-xl transition-all shadow-md shadow-orange-600/10 text-sm cursor-pointer"
          >
            + Add Education
          </button>
        )}
      </div>

      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl text-sm font-semibold">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-655 rounded-xl text-sm font-semibold">
          {errorMsg}
        </div>
      )}

      {editingEducation ? (
        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
            {isNew ? 'Add Education Entry' : 'Edit Education Details'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Icon Emoji</label>
              <input
                type="text"
                value={editingEducation.icon}
                onChange={(e) => handleFieldChange('icon', e.target.value)}
                className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Year Range / Year</label>
              <input
                type="text"
                value={editingEducation.year}
                onChange={(e) => handleFieldChange('year', e.target.value)}
                placeholder="2021 — 2025"
                className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-550/10 transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-505 uppercase tracking-wider">Degree / Course Title</label>
              <input
                type="text"
                value={editingEducation.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Institution / School Name</label>
            <input
              type="text"
              value={editingEducation.institution}
              onChange={(e) => handleFieldChange('institution', e.target.value)}
              className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-550/10 transition-all"
              required
            />
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
              onClick={() => setEditingEducation(null)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-6 rounded-xl transition-all text-sm cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {portfolioData.education.map((edu) => (
            <div key={edu._id} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm hover:border-slate-300 transition-all">
              <div className="flex items-center gap-4">
                <span className="text-3xl bg-slate-50 p-2.5 rounded-xl border border-slate-150 shadow-sm">{edu.icon || '🎓'}</span>
                <div>
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">{edu.year}</span>
                  <h4 className="text-base font-bold text-slate-900 leading-tight">{edu.title}</h4>
                  <p className="text-slate-500 text-xs mt-0.5">{edu.institution}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStartEdit(edu)}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2 px-4 rounded-xl transition-all border border-slate-200 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(edu._id!)}
                  className="bg-red-50 border border-red-200 hover:bg-red-500 hover:text-white text-red-650 text-xs font-bold py-2 px-4 rounded-xl transition-all cursor-pointer"
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
