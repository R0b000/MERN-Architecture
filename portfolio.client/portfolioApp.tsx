import { RouteRenderer } from 'shared-ui/router/RouteRenderer';
import { PortfolioRoutes } from './routes/routes';

const PortfolioApp = () => {
  return <RouteRenderer config={PortfolioRoutes} />;
};

export default PortfolioApp;
