import { axiosConfig } from 'shared-ui/axios/AxiosConfig';
import type { IResponse } from 'shared-api/wrappers/IResponse';

export interface PortfolioData {
  aboutMe: {
    role: string;
    education: string;
    college: string;
    gradYear: number;
    traits: string[];
    focus: string;
    intro: string;
    typewriterPhrases: string[];
    stats: {
      yearsExperience: string;
      projectsShipped: string;
      techStacks: string;
      curiosity: string;
    };
  };
  education: Array<{
    _id?: string;
    icon: string;
    year: string;
    title: string;
    institution: string;
  }>;
  skills: Array<{
    _id?: string;
    name: string;
    level: string;
  }>;
  tools: string[];
  languages: {
    programming: Array<{
      _id?: string;
      name: string;
      rating: string;
    }>;
    spoken: Array<{
      _id?: string;
      name: string;
      rating: string;
    }>;
  };
  experience: Array<{
    _id?: string;
    company: string;
    period: string;
    role: string;
    bulletPoints: string[];
  }>;
  projects: Array<{
    _id?: string;
    category: string;
    title: string;
    description: string;
    tags: string[];
    imageUrl: string;
    githubUrl: string;
    liveUrl: string;
  }>;
  marquee: string[];
  contact: {
    name: string;
    role: string;
    phone: string;
    email: string;
    location: string;
    available: boolean;
  };
}

class PortfolioAPIService {
  async getPortfolioData(): Promise<IResponse<PortfolioData>> {
    const response = await axiosConfig.get<IResponse<PortfolioData>>('/portfolio');
    return response.data;
  }

  async updatePortfolioData(data: Partial<PortfolioData>): Promise<IResponse<PortfolioData>> {
    const response = await axiosConfig.put<IResponse<PortfolioData>>('/portfolio', data);
    return response.data;
  }

  async postMessage(data: { name: string; email: string; subject: string; message: string }): Promise<IResponse<any>> {
    const response = await axiosConfig.post<IResponse<any>>('/portfolio/messages', data);
    return response.data;
  }

  async getMessages(): Promise<IResponse<any[]>> {
    const response = await axiosConfig.get<IResponse<any[]>>('/portfolio/messages');
    return response.data;
  }
}

export const portfolioAPIService = new PortfolioAPIService();
export { PortfolioAPIService };
export default PortfolioAPIService;
