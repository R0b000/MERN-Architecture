import React, { useEffect, useState } from 'react';
import { portfolioAPIService } from '../../services/PortfolioAPIService';

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
  const [errorMsg, setErrorMsg] = useState('');

  const fetchMessages = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const response = await portfolioAPIService.getMessages();
      if (response.success && response.data) {
        setMessages(response.data as unknown as MessageType[]);
      } else {
        setErrorMsg(response.messages?.[0] || 'Failed to retrieve messages.');
      }
    } catch (err) {
      setErrorMsg('A network error occurred while fetching messages.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Client Inquiries</h1>
          <p className="text-sm text-slate-400">View and respond to incoming contact messages from your portfolio website.</p>
        </div>
        <button
          onClick={fetchMessages}
          className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-750 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          🔄 Refresh Inbox
        </button>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-medium">
          {errorMsg}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[250px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : messages.length === 0 ? (
        <div className="border border-slate-800 rounded-2xl bg-slate-900/50 p-12 text-center text-slate-400 max-w-lg mx-auto mt-6">
          <span className="text-4xl block mb-3">✉️</span>
          <h4 className="font-bold text-white mb-1">Your Inbox is Empty</h4>
          <p className="text-sm">Inbound messages from visitors submitting the contact form on your portfolio will show up here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
            Total Messages: {messages.length}
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {messages.map((msg) => (
              <div key={msg._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white text-base">{msg.name}</span>
                      <a href={`mailto:${msg.email}`} className="text-xs text-orange-500 hover:underline">{msg.email}</a>
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                      Sent: {new Date(msg.createdAt).toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="space-y-1 bg-slate-950 p-3.5 rounded-xl border border-slate-850">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">// Subject: {msg.subject}</span>
                    <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed mt-1.5">{msg.message}</p>
                  </div>
                </div>
                
                <a
                  href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                  className="bg-orange-600/10 border border-orange-600/20 text-orange-500 hover:bg-orange-600 hover:text-white text-xs font-semibold py-2 px-4 rounded-xl transition-all self-start flex items-center gap-1 shrink-0"
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
