import { Routes, Route } from 'react-router-dom';
import type { RouteConfig, RouteDef } from './RouteRenderer.types';

const renderRoute = (route: RouteDef, index: number): React.ReactNode => {
  const Component = route.element;
  
  if (route.children && route.children.length > 0) {
    return (
      <Route
        key={index}
        path={route.path}
        element={<Component />}
      >
        {route.children.map((child, childIdx) => renderRoute(child, childIdx))}
      </Route>
    );
  }

  if (route.index) {
    return (
      <Route
        key={index}
        index
        element={<Component />}
      />
    );
  }

  return (
    <Route
      key={index}
      path={route.path}
      element={<Component />}
    />
  );
};

export const RouteRenderer = ({ config }: { config: RouteConfig }) => {
  return (
    <Routes>
      {config.routes.map((route, index) => renderRoute(route, index))}
    </Routes>
  );
};
