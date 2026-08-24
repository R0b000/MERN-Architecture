import { PortfolioHomePage } from '../components/home/PortfolioHomePage';
import type { RouteConfig } from 'shared-ui/router/RouteRenderer.types';

export const PortfolioRoutes = {
  layout: '',
  routes: [
    { index: true, element: PortfolioHomePage },
  ],
} satisfies RouteConfig;

export default PortfolioRoutes;
