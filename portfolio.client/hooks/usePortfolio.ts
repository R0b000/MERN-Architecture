import { useState, useEffect } from 'react';
import { portfolioAPIService } from '../services/PortfolioAPIService';
import type { Portfolio } from '../models/database/Portfolio';
import type { UpdatePortfolioRequest } from '../models/requests/PortfolioRequestModel';

export const usePortfolio = () => {
  const [portfolioData, setPortfolioData] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const fetchPortfolio = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await portfolioAPIService.getPortfolioData();
      if (response.success && response.data) {
        setPortfolioData(response.data);
        return response.data;
      } else {
        setErrorMsg(response.messages?.[0] || 'Failed to load portfolio data');
        return null;
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to connect to portfolio API');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePortfolio = async (data: UpdatePortfolioRequest) => {
    setIsPending(true);
    setErrorMsg(null);
    try {
      const response = await portfolioAPIService.updatePortfolioData(data);
      if (response.success && response.data) {
        setPortfolioData(response.data);
        return response.data;
      } else {
        setErrorMsg(response.messages?.[0] || 'Failed to update portfolio');
        return null;
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Network error occurred');
      return null;
    } finally {
      setIsPending(false);
    }
  };

  return { portfolioData, isLoading, isPending, errorMsg, fetchPortfolio, updatePortfolio };
};
