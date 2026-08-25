export const PortfolioAPIRoutes = {
  PORTFOLIO: '/portfolio',
  MESSAGES: '/portfolio/messages',
  ANALYTICS_HIRE: '/portfolio/analytics/hire',
  ANALYTICS_PROJECT: '/portfolio/analytics/project',
} as const;

export type PortfolioAPIRoutes = typeof PortfolioAPIRoutes;
