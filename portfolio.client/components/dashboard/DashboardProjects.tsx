import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { portfolioAPIService, PortfolioData } from '../../services/PortfolioAPIService';

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
}

export const DashboardProjects = () => {
  const { portfolioData, refreshData } = useOutletContext<OutletContextType>();
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [tagInput, setTagInput] = useState('');

  // Selected project for editing. If null, we are showing the list.
  const [editingProject, setEditingProject] = useState<ProjectType | null>(null);
  // Is this a brand new project?
  const [isNew, setIsNew] = useState(false);

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
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleStartEdit = (project: ProjectType) => {
    setEditingProject({ ...project });
    setIsNew(false);
    setTagInput('');
    setSuccessMsg('');
    setErrorMsg('');
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

  const handleDelete = async (projectId: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    setIsSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const updatedProjects = portfolioData.projects.filter(p => p._id !== projectId);
      const response = await portfolioAPIService.updatePortfolioData({
        projects: updatedProjects
      });

      if (response.success) {
        setSuccessMsg('Project deleted successfully!');
        await refreshData();
      } else {
        setErrorMsg(response.messages?.[0] || 'Failed to delete project');
      }
    } catch (err) {
      setErrorMsg('A network error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setIsSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

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
        setSuccessMsg(isNew ? 'Project created successfully!' : 'Project updated successfully!');
        setEditingProject(null);
        await refreshData();
      } else {
        setErrorMsg(response.messages?.[0] || 'Failed to save project');
      }
    } catch (err) {
      setErrorMsg('A network error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Head section */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Portfolio Projects</h1>
          <p className="text-sm text-slate-400">Manage academic and personal showcase projects visible on your landing page.</p>
        </div>
        {!editingProject && (
          <button
            onClick={handleStartAdd}
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-5 rounded-xl transition-all shadow-md shadow-orange-600/10 text-sm"
          >
            + Add New Project
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

      {/* Editing Form */}
      {editingProject ? (
        <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
            {isNew ? 'Create Project Showcase' : 'Edit Project Details'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Project Title</label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</label>
              <select
                value={editingProject.category}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
              >
                <option value="academic">Academic / AI Model</option>
                <option value="other">Personal / Practical Dev</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</label>
            <textarea
              rows={4}
              value={editingProject.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Image Link URL</label>
              <input
                type="text"
                value={editingProject.imageUrl}
                onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">GitHub Link URL</label>
              <input
                type="text"
                value={editingProject.githubUrl}
                onChange={(e) => handleFieldChange('githubUrl', e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Deploy URL</label>
              <input
                type="text"
                value={editingProject.liveUrl}
                onChange={(e) => handleFieldChange('liveUrl', e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Tags Section */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Tech Tags (Press Enter to add)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {editingProject.tags.map((tag, idx) => (
                <span key={idx} className="bg-slate-950 border border-slate-850 px-3 py-1 text-xs text-orange-500 font-semibold rounded-lg flex items-center gap-1.5">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="text-red-500 font-bold hover:text-red-400">×</button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="React, Laravel, NLP..."
              className="w-full max-w-xs bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex gap-3 pt-3 border-t border-slate-800">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md text-sm disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Project'}
            </button>
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 px-6 rounded-xl transition-all text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        /* List of Projects */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.projects.map((project) => (
            <div key={project._id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between h-full group hover:border-slate-700 transition-colors">
              <div>
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-44 object-cover border-b border-slate-800" />
                ) : (
                  <div className="w-full h-44 bg-slate-950 flex items-center justify-center border-b border-slate-800 text-slate-700 text-xs">
                    No Image Specified
                  </div>
                )}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-orange-500 tracking-widest bg-orange-600/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                      {project.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white">{project.title}</h4>
                  <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((t, i) => (
                      <span key={i} className="text-[10px] bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-slate-500 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-5 pt-0 flex gap-2.5 border-t border-slate-800/40 mt-auto">
                <button
                  onClick={() => handleStartEdit(project)}
                  className="flex-1 bg-slate-850 hover:bg-slate-800 text-slate-200 text-xs font-semibold py-2 rounded-xl transition-all border border-slate-800"
                >
                  Edit Details
                </button>
                <button
                  onClick={() => handleDelete(project._id!)}
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

export default DashboardProjects;
