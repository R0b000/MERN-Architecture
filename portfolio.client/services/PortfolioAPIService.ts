import { axiosConfig } from 'shared-ui/axios/AxiosConfig';
import type { IResponse } from 'shared-api/wrappers/IResponse';
import { PortfolioAPIRoutes } from '../config/PortfolioAPIRoutes';
import type { Portfolio } from '../models/database/Portfolio';
import type { UpdatePortfolioRequest, SendMessageRequest } from '../models/requests/PortfolioRequestModel';
import type { PortfolioResponse, MessageResponse } from '../models/responses/PortfolioResponseModel';

// Re-export type for compatibility with other files using the old type name
export type PortfolioData = Portfolio;

class PortfolioAPIService {
  async getPortfolioData(): Promise<IResponse<PortfolioResponse>> {
    const response = await axiosConfig.get<IResponse<PortfolioResponse>>(PortfolioAPIRoutes.PORTFOLIO);
    return response.data;
  }

  async updatePortfolioData(data: UpdatePortfolioRequest): Promise<IResponse<PortfolioResponse>> {
    const response = await axiosConfig.put<IResponse<PortfolioResponse>>(PortfolioAPIRoutes.PORTFOLIO, data);
    return response.data;
  }

  async postMessage(data: SendMessageRequest): Promise<IResponse<MessageResponse>> {
    const response = await axiosConfig.post<IResponse<MessageResponse>>(PortfolioAPIRoutes.MESSAGES, data);
    return response.data;
  }

  async getMessages(): Promise<IResponse<MessageResponse[]>> {
    const response = await axiosConfig.get<IResponse<MessageResponse[]>>(PortfolioAPIRoutes.MESSAGES);
    return response.data;
  }
}

export const portfolioAPIService = new PortfolioAPIService();
export { PortfolioAPIService };
export default PortfolioAPIService;
