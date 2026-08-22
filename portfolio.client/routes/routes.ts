import HomePage = require(../index.html);

export const PortfolioRoutes = {
  layout: '',
  routes: [
    { index: true, element: HomePage },
  ],
} satisfies RouteConfig;

export default PortfolioRoute;
