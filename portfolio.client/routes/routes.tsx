import React from 'react';
import type { RouteConfig } from 'shared-ui/router/RouteRenderer.types';

// Eagerly loaded public components to keep the main "/" route instant and unbroken
import { PortfolioHomePage } from '../components/home/PortfolioHomePage';

// Lazy Loaded Layout & Dashboard components
const PortfolioLayout = React.lazy(() => import('../components/layout/PortfolioLayout'));
const DashboardOverview = React.lazy(() => import('../components/dashboard/DashboardOverview'));
const DashboardProfile = React.lazy(() => import('../components/dashboard/DashboardProfile'));
const DashboardProjects = React.lazy(() => import('../components/dashboard/DashboardProjects'));
const DashboardEducation = React.lazy(() => import('../components/dashboard/DashboardEducation'));
const DashboardExperience = React.lazy(() => import('../components/dashboard/DashboardExperience'));
const DashboardSkills = React.lazy(() => import('../components/dashboard/DashboardSkills'));
const DashboardMessages = React.lazy(() => import('../components/dashboard/DashboardMessages'));

export const PortfolioRoutes = {
  layout: '',
  routes: [
    // Public portfolio root route (renders eagerly, no layout)
    { path: '/', index: true, element: PortfolioHomePage },
    
    // Admin Dashboard panel routes (lazy loaded, wrapped in PortfolioLayout)
    {
      path: '/dashboard',
      element: PortfolioLayout,
      children: [
        { index: true, element: DashboardOverview },
        { path: 'profile', element: DashboardProfile },
        { path: 'projects', element: DashboardProjects },
        { path: 'education', element: DashboardEducation },
        { path: 'experience', element: DashboardExperience },
        { path: 'skills', element: DashboardSkills },
        { path: 'messages', element: DashboardMessages },
      ],
    },
  ],
} satisfies RouteConfig;

export default PortfolioRoutes;
