export const PortfolioAPIRoutes = {
  PORTFOLIO: '/portfolio',
  MESSAGES: '/portfolio/messages',
} as const;

export type PortfolioAPIRoutes = typeof PortfolioAPIRoutes;
