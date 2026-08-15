import { createContext, useContext, ReactNode } from 'react';
import { httpService } from '../services/HttpService';

interface HttpContextType {
  httpService: typeof httpService;
}

const HttpContext = createContext<HttpContextType | undefined>(undefined);

export const HttpProvider = ({ children }: { children: ReactNode }) => {
  const value = {
    httpService,
  };

  return <HttpContext.Provider value={value}>{children}</HttpContext.Provider>;
};

export const useHttp = () => {
  const context = useContext(HttpContext);
  if (context === undefined) {
    throw new Error('useHttp must be used within an HttpProvider');
  }
  return context;
};
