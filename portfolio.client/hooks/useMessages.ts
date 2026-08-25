import { useState } from 'react';
import { portfolioAPIService } from '../services/PortfolioAPIService';
import type { Message } from '../models/database/Message';
import type { SendMessageRequest } from '../models/requests/PortfolioRequestModel';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const fetchMessages = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await portfolioAPIService.getMessages();
      if (response.success && response.data) {
        setMessages(response.data);
        return response.data;
      } else {
        setErrorMsg(response.messages?.[0] || 'Failed to retrieve messages');
        return null;
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Network error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (data: SendMessageRequest) => {
    setIsPending(true);
    setErrorMsg(null);
    try {
      const response = await portfolioAPIService.postMessage(data);
      if (response.success && response.data) {
        return response.data;
      } else {
        setErrorMsg(response.messages?.[0] || 'Failed to send message');
        return null;
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Network error occurred');
      return null;
    } finally {
      setIsPending(false);
    }
  };

  const markAsRead = async (id: string) => {
    setIsPending(true);
    setErrorMsg(null);
    try {
      const response = await portfolioAPIService.markMessageAsRead(id);
      if (response.success && response.data) {
        setMessages(prev => prev.map(m => m._id === id ? { ...m, isRead: true } : m));
        return response.data;
      } else {
        setErrorMsg(response.messages?.[0] || 'Failed to mark message as read');
        return null;
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Network error occurred');
      return null;
    } finally {
      setIsPending(false);
    }
  };

  return { messages, isLoading, isPending, errorMsg, fetchMessages, sendMessage, markAsRead };
};
