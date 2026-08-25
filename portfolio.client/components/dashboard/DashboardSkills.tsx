import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { portfolioAPIService, PortfolioData } from '../../services/PortfolioAPIService';

interface OutletContextType {
  portfolioData: PortfolioData;
  refreshData: () => Promise<void>;
}

interface SkillType {
  _id?: string;
  name: string;
  level: string;
}

export const DashboardSkills = () => {
  const { portfolioData, refreshData } = useOutletContext<OutletContextType>();
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [skills, setSkills] = useState<SkillType[]>([...portfolioData.skills]);
  const [tools, setTools] = useState<string[]>([...portfolioData.tools]);

  const [newSkill, setNewSkill] = useState({ name: '', level: '85%' });
  const [newTool, setNewTool] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.name.trim()) {
      setSkills(prev => [...prev, { name: newSkill.name.trim(), level: newSkill.level }]);
      setNewSkill({ name: '', level: '85%' });
    }
  };

  const handleRemoveSkill = (idx: number) => {
    setSkills(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSkillLevelChange = (idx: number, level: string) => {
    setSkills(prev => prev.map((s, i) => i === idx ? { ...s, level } : s));
  };

  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTool.trim() && !tools.includes(newTool.trim())) {
      setTools(prev => [...prev, newTool.trim()]);
      setNewTool('');
    }
  };

  const handleRemoveTool = (tool: string) => {
    setTools(prev => prev.filter(t => t !== tool));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await portfolioAPIService.updatePortfolioData({
        skills,
        tools
      });

      if (response.success) {
        setSuccessMsg('Skills and tools updated successfully!');
        await refreshData();
      } else {
        setErrorMsg(response.messages?.[0] || 'Failed to save changes');
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Skills & Tech Stack Tools</h1>
          <p className="text-sm text-slate-500">Manage technical stack languages and tools displayed on your profile.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-xl transition-all shadow-md shadow-orange-600/10 text-sm disabled:opacity-50 cursor-pointer"
        >
          {isSaving ? 'Saving Changes...' : 'Save Skills & Tools'}
        </button>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Skills Rating</h3>

          <form onSubmit={handleAddSkill} className="flex gap-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <input
              type="text"
              placeholder="e.g. React, Laravel, C#"
              value={newSkill.name}
              onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
              className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
              required
            />
            <select
              value={newSkill.level}
              onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value }))}
              className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
            >
              {[...Array(11).keys()].map(i => {
                const percent = `${i * 10}%`;
                return <option key={percent} value={percent}>{percent}</option>;
              })}
            </select>
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-4 py-1.5 rounded-lg text-xs tracking-wider cursor-pointer"
            >
              ADD
            </button>
          </form>

          <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-2">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-50/50 p-3 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex-1">
                  <span className="text-sm font-bold text-slate-800">{skill.name}</span>
                  <div className="w-full max-w-xs bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-orange-500 h-full" style={{ width: skill.level }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={skill.level}
                    onChange={(e) => handleSkillLevelChange(idx, e.target.value)}
                    className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700"
                  >
                    {[...Array(11).keys()].map(i => {
                      const percent = `${i * 10}%`;
                      return <option key={percent} value={percent}>{percent}</option>;
                    })}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(idx)}
                    className="text-red-500 hover:text-red-400 font-bold text-lg select-none cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Tools & Packages</h3>

          <form onSubmit={handleAddTool} className="flex gap-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <input
              type="text"
              placeholder="e.g. Git, Docker, Postman"
              value={newTool}
              onChange={(e) => setNewTool(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-4 py-1.5 rounded-lg text-xs tracking-wider cursor-pointer"
            >
              ADD
            </button>
          </form>

          <div className="flex flex-wrap gap-2.5 max-h-[350px] overflow-y-auto pr-2">
            {tools.map((tool, idx) => (
              <span key={idx} className="bg-orange-50 border border-orange-100 px-3 py-1.5 text-xs text-orange-750 font-bold rounded-xl flex items-center gap-2 shadow-sm">
                {tool}
                <button
                  type="button"
                  onClick={() => handleRemoveTool(tool)}
                  className="text-red-500 hover:text-red-450 font-bold focus:outline-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkills;
