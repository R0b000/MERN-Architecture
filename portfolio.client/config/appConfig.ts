import { Portfolio } from "../models/database/Portfolio";

export interface PortfolioState {
  portfolio: Portfolio | null;
  isLoading: boolean;
  error: string | null;
}
