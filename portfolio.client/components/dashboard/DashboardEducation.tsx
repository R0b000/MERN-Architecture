import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { portfolioAPIService, PortfolioData } from '../../services/PortfolioAPIService';
import { useToast } from '../toast/ToastContext';
import { ConfirmModal } from '../modal/ConfirmModal';

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
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [editingEducation, setEditingEducation] = useState<EducationType | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Custom Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eduToDeleteId, setEduToDeleteId] = useState<string | null>(null);

  const handleStartAdd = () => {
    setEditingEducation({
      icon: '🎓',
      year: '',
      title: '',
      institution: ''
    });
    setIsNew(true);
  };

  const handleStartEdit = (edu: EducationType) => {
    setEditingEducation({ ...edu });
    setIsNew(false);
  };

  const handleFieldChange = (key: keyof EducationType, value: string) => {
    if (!editingEducation) return;
    setEditingEducation(prev => {
      if (!prev) return null;
      return { ...prev, [key]: value };
    });
  };

  const handleTriggerDelete = (eduId: string) => {
    setEduToDeleteId(eduId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!eduToDeleteId) return;
    setIsSaving(true);

    try {
      const updatedEducation = portfolioData.education.filter(e => e._id !== eduToDeleteId);
      const response = await portfolioAPIService.updatePortfolioData({
        education: updatedEducation
      });

      if (response.success) {
        showToast('Education credential deleted successfully!', 'success');
        await refreshData();
      } else {
        showToast(response.messages?.[0] || 'Failed to delete entry', 'error');
      }
    } catch (err) {
      showToast('A network error occurred', 'error');
    } finally {
      setIsSaving(false);
      setDeleteModalOpen(false);
      setEduToDeleteId(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEducation) return;
    setIsSaving(true);

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
        showToast(isNew ? 'Education entry added successfully!' : 'Education entry updated successfully!', 'success');
        setEditingEducation(null);
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

      {editingEducation ? (
        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
            {isNew ? 'Add Education Entry' : 'Edit Education Details'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-505 uppercase tracking-wider">Icon Emoji</label>
              <input
                type="text"
                value={editingEducation.icon}
                onChange={(e) => handleFieldChange('icon', e.target.value)}
                className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-505 uppercase tracking-wider">Year Range / Year</label>
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
            <label className="text-xs font-semibold text-slate-505 uppercase tracking-wider">Institution / School Name</label>
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
                  <p className="text-slate-505 text-xs mt-0.5">{edu.institution}</p>
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
                  onClick={() => handleTriggerDelete(edu._id!)}
                  className="bg-red-50 border border-red-200 hover:bg-red-500 hover:text-white text-red-650 text-xs font-bold py-2 px-4 rounded-xl transition-all cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Academic Credential"
        message="Are you sure you want to delete this education entry? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setEduToDeleteId(null);
        }}
      />
    </div>
  );
};

export default DashboardEducation;
