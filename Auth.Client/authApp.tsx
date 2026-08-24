import { RouteRenderer } from 'shared-ui/router/RouteRenderer';
import { AuthRouter } from './routes/routes';

const AuthApp = () => {
  return <RouteRenderer config={AuthRouter} />;
};

export default AuthApp;
