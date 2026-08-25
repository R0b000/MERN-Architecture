import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { portfolioAPIService, PortfolioData } from '../../services/PortfolioAPIService';
import { useToast } from '../toast/ToastContext';
import { ConfirmModal } from '../modal/ConfirmModal';

interface OutletContextType {
  portfolioData: PortfolioData;
  refreshData: () => Promise<void>;
}

interface ProjectType {
  _id?: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  progress?: string;
}

export const DashboardProjects = () => {
  const { portfolioData, refreshData } = useOutletContext<OutletContextType>();
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');

  // Selected project for editing. If null, we are showing the list.
  const [editingProject, setEditingProject] = useState<ProjectType | null>(null);
  const [isNew, setIsNew] = useState(false);

  // Custom Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDeleteId, setProjectToDeleteId] = useState<string | null>(null);

  const handleStartAdd = () => {
    setEditingProject({
      category: 'other',
      title: '',
      description: '',
      tags: [],
      imageUrl: '',
      githubUrl: '',
      liveUrl: ''
    });
    setIsNew(true);
    setTagInput('');
  };

  const handleStartEdit = (project: ProjectType) => {
    setEditingProject({ ...project });
    setIsNew(false);
    setTagInput('');
  };

  const handleFieldChange = (key: keyof ProjectType, value: any) => {
    if (!editingProject) return;
    setEditingProject(prev => {
      if (!prev) return null;
      return { ...prev, [key]: value };
    });
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() && editingProject) {
      e.preventDefault();
      if (!editingProject.tags.includes(tagInput.trim())) {
        handleFieldChange('tags', [...editingProject.tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (!editingProject) return;
    handleFieldChange('tags', editingProject.tags.filter(t => t !== tagToRemove));
  };

  const handleTriggerDelete = (projectId: string) => {
    setProjectToDeleteId(projectId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDeleteId) return;
    setIsSaving(true);

    try {
      const updatedProjects = portfolioData.projects.filter(p => p._id !== projectToDeleteId);
      const response = await portfolioAPIService.updatePortfolioData({
        projects: updatedProjects
      });

      if (response.success) {
        showToast('Project deleted successfully!', 'success');
        await refreshData();
      } else {
        showToast(response.messages?.[0] || 'Failed to delete project', 'error');
      }
    } catch (err) {
      showToast('A network error occurred', 'error');
    } finally {
      setIsSaving(false);
      setDeleteModalOpen(false);
      setProjectToDeleteId(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setIsSaving(true);

    try {
      let updatedProjects = [...portfolioData.projects];

      if (isNew) {
        updatedProjects.push(editingProject);
      } else {
        updatedProjects = updatedProjects.map(p => p._id === editingProject._id ? editingProject : p);
      }

      const response = await portfolioAPIService.updatePortfolioData({
        projects: updatedProjects
      });

      if (response.success) {
        showToast(isNew ? 'Project created successfully!' : 'Project updated successfully!', 'success');
        setEditingProject(null);
        await refreshData();
      } else {
        showToast(response.messages?.[0] || 'Failed to save project', 'error');
      }
    } catch (err) {
      showToast('A network error occurred', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Head section */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Portfolio Projects</h1>
          <p className="text-sm text-slate-505">Manage academic and personal showcase projects visible on your landing page.</p>
        </div>
        {!editingProject && (
          <button
            onClick={handleStartAdd}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-5 rounded-xl transition-all shadow-md shadow-orange-600/10 text-sm cursor-pointer"
          >
            + Add New Project
          </button>
        )}
      </div>

      {/* Editing Form */}
      {editingProject ? (
        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
            {isNew ? 'Create Project Showcase' : 'Edit Project Details'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-505 uppercase tracking-wider">Project Title</label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-555 uppercase tracking-wider">Category</label>
              <select
                value={editingProject.category}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
              >
                <option value="academic">Academic / AI Model</option>
                <option value="other">Personal / Practical Dev</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-555 uppercase tracking-wider">Project Progress</label>
              <select
                value={editingProject.progress || 'Completed'}
                onChange={(e) => handleFieldChange('progress', e.target.value)}
                className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-505 uppercase tracking-wider">Description</label>
            <textarea
              rows={4}
              value={editingProject.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-505 uppercase tracking-wider">Image Link URL</label>
              <input
                type="text"
                value={editingProject.imageUrl}
                onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-505 uppercase tracking-wider">GitHub Link URL</label>
              <input
                type="text"
                value={editingProject.githubUrl}
                onChange={(e) => handleFieldChange('githubUrl', e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-505 uppercase tracking-wider">Live Deploy URL</label>
              <input
                type="text"
                value={editingProject.liveUrl}
                onChange={(e) => handleFieldChange('liveUrl', e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-55 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
              />
            </div>
          </div>

          {/* Tags Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-505 uppercase tracking-wider block">Tech Tags (Press Enter to add)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {editingProject.tags.map((tag, idx) => (
                <span key={idx} className="bg-orange-50 border border-orange-100 px-3 py-1 text-xs text-orange-655 font-bold rounded-lg flex items-center gap-1.5 shadow-sm">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="text-red-500 font-bold hover:text-red-400 focus:outline-none">×</button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="React, Laravel, NLP..."
              className="w-full max-w-xs bg-slate-55 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
            />
          </div>

          <div className="flex gap-3 pt-3 border-t border-slate-100">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md text-sm disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? 'Saving...' : 'Save Project'}
            </button>
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-6 rounded-xl transition-all text-sm cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        /* List of Projects */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.projects.map((project) => (
            <div key={project._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between h-full hover:shadow-md hover:border-slate-300 transition-all">
              <div>
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-44 object-cover border-b border-slate-100" />
                ) : (
                  <div className="w-full h-44 bg-slate-100 flex items-center justify-center border-b border-slate-200 text-slate-400 text-xs">
                    No Image Specified
                  </div>
                )}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-orange-655 tracking-widest bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-100 shadow-sm">
                      {project.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{project.title}</h4>
                  <p className="text-slate-505 text-sm line-clamp-3 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((t, i) => (
                      <span key={i} className="text-[10px] bg-slate-50 border border-slate-150 px-2 py-0.5 rounded-lg text-slate-500 font-bold shadow-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-5 pt-0 flex gap-2.5 border-t border-slate-105 mt-auto">
                <button
                  onClick={() => handleStartEdit(project)}
                  className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold py-2 rounded-xl transition-all border border-slate-200 cursor-pointer"
                >
                  Edit Details
                </button>
                <button
                  onClick={() => handleTriggerDelete(project._id!)}
                  className="bg-red-50 border border-red-200 hover:bg-red-500 hover:text-white text-red-650 text-xs font-bold py-2 px-4 rounded-xl transition-all cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Project Showcase"
        message="Are you sure you want to permanently delete this project from your portfolio? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setProjectToDeleteId(null);
        }}
      />
    </div>
  );
};

export default DashboardProjects;
