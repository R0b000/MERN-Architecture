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
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Skills & Tech Stack Tools</h1>
          <p className="text-sm text-slate-400">Manage technical stack languages and tools displayed on your profile.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-xl transition-all shadow-md text-sm disabled:opacity-50"
        >
          {isSaving ? 'Saving Changes...' : 'Save Skills & Tools'}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Skills Rating</h3>

          <form onSubmit={handleAddSkill} className="flex gap-2 bg-slate-950 p-4 rounded-xl border border-slate-850">
            <input
              type="text"
              placeholder="e.g. React, Laravel, C#"
              value={newSkill.name}
              onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
              required
            />
            <select
              value={newSkill.level}
              onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value }))}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
            >
              {[...Array(11).keys()].map(i => {
                const percent = `${i * 10}%`;
                return <option key={percent} value={percent}>{percent}</option>;
              })}
            </select>
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-4 py-1.5 rounded-lg text-xs tracking-wider"
            >
              ADD
            </button>
          </form>

          <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-2">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-950/50 p-3 rounded-xl border border-slate-850">
                <div className="flex-1">
                  <span className="text-sm font-semibold text-slate-200">{skill.name}</span>
                  <div className="w-full max-w-xs bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-orange-500 h-full" style={{ width: skill.level }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={skill.level}
                    onChange={(e) => handleSkillLevelChange(idx, e.target.value)}
                    className="bg-slate-900 border border-slate-850 rounded px-2 py-1 text-xs text-slate-300"
                  >
                    {[...Array(11).keys()].map(i => {
                      const percent = `${i * 10}%`;
                      return <option key={percent} value={percent}>{percent}</option>;
                    })}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(idx)}
                    className="text-red-500 hover:text-red-400 font-bold text-lg select-none"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Tools & Packages</h3>

          <form onSubmit={handleAddTool} className="flex gap-2 bg-slate-950 p-4 rounded-xl border border-slate-850">
            <input
              type="text"
              placeholder="e.g. Git, Docker, Postman"
              value={newTool}
              onChange={(e) => setNewTool(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-orange-500"
              required
            />
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-4 py-1.5 rounded-lg text-xs tracking-wider"
            >
              ADD
            </button>
          </form>

          <div className="flex flex-wrap gap-2.5 max-h-[350px] overflow-y-auto pr-2">
            {tools.map((tool, idx) => (
              <span key={idx} className="bg-slate-950 border border-slate-850 px-3 py-1.5 text-xs text-slate-350 rounded-xl flex items-center gap-2">
                {tool}
                <button
                  type="button"
                  onClick={() => handleRemoveTool(tool)}
                  className="text-red-500 hover:text-red-400 font-bold"
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
