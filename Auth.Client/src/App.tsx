import { RouteRenderer } from 'shared-ui/router/RouteRenderer';
import { AuthRouter } from '../routes/routes';

const App = () => {
  return <RouteRenderer config={AuthRouter} />;
};

export default App;
