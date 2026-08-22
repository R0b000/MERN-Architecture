import { RouteRenderer } from '../Shared/UI/router/RouteRenderer';
import { AppRouter } from './routes';

const App = () => {
  return <RouteRenderer config={AppRouter} />;
};

export default App;
