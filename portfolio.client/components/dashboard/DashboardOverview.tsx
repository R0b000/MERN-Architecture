import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { portfolioAPIService, PortfolioData } from '../../services/PortfolioAPIService';
import { useToast } from '../toast/ToastContext';

interface OutletContextType {
  portfolioData: PortfolioData;
  refreshData: () => Promise<void>;
}

interface MessageType {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const DashboardOverview = () => {
  const { portfolioData, refreshData } = useOutletContext<OutletContextType>();
  const { showToast } = useToast();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [isUpdatingProject, setIsUpdatingProject] = useState(false);

  // Fetch messages
  const fetchInbox = async () => {
    try {
      const response = await portfolioAPIService.getMessages();
      if (response.success && response.data) {
        setMessages(response.data as unknown as MessageType[]);
      }
    } catch (err) {
      console.error('Failed to load dashboard messages');
    } finally {
      setLoadingMessages(false);
    }
  };

  // Poll messages + analytics every 10 seconds
  useEffect(() => {
    fetchInbox();
    refreshData();

    const interval = setInterval(() => {
      fetchInbox();
      refreshData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Update project progress on click (cycles between Planning -> In Progress -> Completed)
  const handleCycleProjectProgress = async (projectId: string, currentProgress = 'Completed') => {
    if (isUpdatingProject) return;
    setIsUpdatingProject(true);

    const statuses = ['Planning', 'In Progress', 'Completed'];
    const nextStatusIdx = (statuses.indexOf(currentProgress) + 1) % statuses.length;
    const nextStatus = statuses[nextStatusIdx];

    try {
      const updatedProjects = portfolioData.projects.map(p => {
        if (p._id === projectId) {
          return { ...p, progress: nextStatus };
        }
        return p;
      });

      const response = await portfolioAPIService.updatePortfolioData({
        projects: updatedProjects
      });

      if (response.success) {
        showToast(`Project progress updated to "${nextStatus}"`, 'success');
        await refreshData();
      } else {
        showToast(response.messages?.[0] || 'Failed to update status', 'error');
      }
    } catch (err) {
      showToast('A network error occurred', 'error');
    } finally {
      setIsUpdatingProject(false);
    }
  };

  // Mark message as read
  const handleMarkMessageRead = async (messageId: string) => {
    try {
      const response = await portfolioAPIService.markMessageAsRead(messageId);
      if (response.success) {
        showToast('Message marked as read', 'success');
        setMessages(prev => prev.map(m => m._id === messageId ? { ...m, isRead: true } : m));
      } else {
        showToast(response.messages?.[0] || 'Failed to update message', 'error');
      }
    } catch (err) {
      showToast('A network error occurred', 'error');
    }
  };

  const totalViews = portfolioData.analytics?.views || 0;
  const totalHireClicks = portfolioData.analytics?.hireMeClicks || 0;
  const totalProjectClicks = portfolioData.analytics?.projectClicks || 0;
  const totalMessages = messages.length;
  const unreadMessagesCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="space-y-6">
      {/* Top Welcome Panel */}
      {/* <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Console Dashboard</h1>
        <p className="text-sm text-slate-500">Live analytics metrics and system status overview.</p>
      </div> */}

      {/* Analytics Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* views */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl shrink-0">
            👁️
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Portfolio Views</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">{totalViews}</h3>
          </div>
        </div>

        {/* hire clicks */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-655 rounded-xl flex items-center justify-center text-xl shrink-0">
            🤝
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hire Me Inquiries</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">{totalHireClicks}</h3>
          </div>
        </div>

        {/* project clicks */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl shrink-0">
            📁
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Clicks</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">{totalProjectClicks}</h3>
          </div>
        </div>

        {/* messages inbox */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center text-xl shrink-0">
            ✉️
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unread Messages</p>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">
              {unreadMessagesCount} <span className="text-xs font-semibold text-slate-400">/ {totalMessages} total</span>
            </h3>
          </div>
        </div>
      </div>

      {/* Main Mid Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects Progress Tracker */}
        {/* <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <span>📁</span> Projects Progress Tracker
          </h3>
          <p className="text-xs text-slate-400">// Click badge status to cycle (Planning → In Progress → Completed)</p>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {portfolioData.projects.map((project) => {
              const status = project.progress || 'Completed';
              return (
                <div key={project._id} className="flex items-center justify-between bg-slate-50/50 border border-slate-150 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex-1 truncate pr-3">
                    <h5 className="text-sm font-bold text-slate-800 truncate">{project.title}</h5>
                    <p className="text-[10px] text-slate-450 uppercase font-semibold mt-0.5">{project.category} build</p>
                  </div>
                  <button
                    onClick={() => handleCycleProjectProgress(project._id!, status)}
                    disabled={isUpdatingProject}
                    className={`text-xs font-bold px-3 py-1 rounded-full cursor-pointer transition-all active:scale-95 ${
                      status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-650 border border-emerald-200'
                        : status === 'In Progress'
                        ? 'bg-orange-50 text-orange-600 border border-orange-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-250'
                    }`}
                  >
                    {status}
                  </button>
                </div>
              );
            })}
          </div>
        </div> */}

        {/* Technical Skills Chart */}
        {/* <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <span>⚙️</span> Skills Rating Index
          </h3>

          <div className="space-y-3.5 max-h-[320px] overflow-y-auto pr-1">
            {portfolioData.skills.map((skill, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{skill.name}</span>
                  <span>{skill.level}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-orange-500 h-full rounded-full transition-all" style={{ width: skill.level }}></div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Bottom Inbox Messages list */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
          <span>✉️</span> Recent Client Inquiries
        </h3>

        {loadingMessages ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            No inbound messages available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {messages.slice(0, 4).map((msg) => (
              <div key={msg._id} className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                msg.isRead 
                  ? 'bg-slate-50/50 border-slate-150 text-slate-750' 
                  : 'bg-orange-50/15 border-orange-100 text-slate-800 ring-1 ring-orange-100/50'
              }`}>
                <div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold border-b border-slate-100 pb-1.5 mb-2">
                    <span>Sent: {new Date(msg.createdAt).toLocaleString()}</span>
                    {!msg.isRead ? (
                      <span className="text-[9px] bg-orange-600 text-white font-extrabold px-2 py-0.5 rounded-full select-none">NEW</span>
                    ) : (
                      <span className="text-[9px] bg-slate-100 text-slate-400 font-bold px-2 py-0.5 rounded-full">READ</span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">{msg.name}</h4>
                  <p className="text-xs text-slate-500 truncate mb-2">{msg.email}</p>
                  <p className="text-xs font-semibold text-slate-650 bg-slate-50 p-2 rounded-lg border border-slate-150 line-clamp-3 leading-relaxed mb-3">
                    <span className="text-[10px] block font-bold text-slate-400 uppercase tracking-widest mb-0.5">Subject: {msg.subject}</span>
                    {msg.message}
                  </p>
                </div>
                
                {!msg.isRead && (
                  <button
                    onClick={() => handleMarkMessageRead(msg._id)}
                    className="self-start text-[10px] font-bold bg-white hover:bg-slate-150 border border-slate-200 text-slate-700 py-1.5 px-3 rounded-lg shadow-sm hover:border-slate-300 transition-all cursor-pointer"
                  >
                    Mark as Read ✓
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
