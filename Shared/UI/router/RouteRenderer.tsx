import { Routes, Route } from 'react-router-dom';
import type { RouteConfig } from './RouteRenderer.types';

export const RouteRenderer = ({ config }: { config: RouteConfig }) => {
  return (
    <Routes>
      {config.routes.map((route, index) => {
        const Component = route.element;
        return (
          <Route
            key={index}
            path={route.path}
            index={route.index}
            element={<Component />}
          />
        );
      })}
    </Routes>
  );
};
