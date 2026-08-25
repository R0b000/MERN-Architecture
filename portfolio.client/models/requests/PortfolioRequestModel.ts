import { Portfolio } from '../database/Portfolio';

export type UpdatePortfolioRequest = Partial<Portfolio>;

export interface SendMessageRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}
