import React, { useEffect, useState } from 'react';
import { portfolioAPIService } from '../../services/PortfolioAPIService';
import { useToast } from '../toast/ToastContext';

interface MessageType {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export const DashboardMessages = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  const fetchMessages = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const response = await portfolioAPIService.getMessages();
      if (response.success && response.data) {
        setMessages(response.data as unknown as MessageType[]);
        if (!silent) showToast('Inbox messages retrieved!', 'success');
      } else {
        showToast(response.messages?.[0] || 'Failed to retrieve messages.', 'error');
      }
    } catch (err) {
      showToast('A network error occurred while fetching messages.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Poll messages silently every 10 seconds
  useEffect(() => {
    fetchMessages(true);

    const interval = setInterval(() => {
      fetchMessages(true);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Client Inquiries</h1>
          <p className="text-sm text-slate-505">View and respond to incoming contact messages from your portfolio website.</p>
        </div>
        <button
          onClick={() => fetchMessages(false)}
          className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
        >
          🔄 Refresh Inbox
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[250px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : messages.length === 0 ? (
        <div className="border border-slate-200 rounded-2xl bg-white p-12 text-center text-slate-400 max-w-lg mx-auto mt-6 shadow-sm">
          <span className="text-4xl block mb-3">✉️</span>
          <h4 className="font-bold text-slate-800 mb-1">Your Inbox is Empty</h4>
          <p className="text-sm">Inbound messages from visitors submitting the contact form on your portfolio will show up here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
            Total Messages: {messages.length}
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {messages.map((msg) => (
              <div key={msg._id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 shadow-sm">
                <div className="space-y-3 flex-1">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-800 text-base">{msg.name}</span>
                      <a href={`mailto:${msg.email}`} className="text-xs text-orange-600 hover:underline">{msg.email}</a>
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                      Sent: {new Date(msg.createdAt).toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="space-y-1 bg-slate-55 p-3.5 rounded-xl border border-slate-150">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">// Subject: {msg.subject}</span>
                    <p className="text-sm text-slate-750 whitespace-pre-wrap leading-relaxed mt-1.5">{msg.message}</p>
                  </div>
                </div>
                
                <a
                  href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                  className="bg-orange-50 border border-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white text-xs font-bold py-2 px-4 rounded-xl transition-all self-start flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  Reply Email ✉
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardMessages;
