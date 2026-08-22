import { PortfolioHomePage } from '../portfolio.client/components/home/PortfolioHomePage';
import { LoginPage } from '../auth.client/components/login/LoginPage';
import { RegisterPage } from '../auth.client/components/register/RegisterPage';
import { HomePage as DashboardPage } from '../auth.client/components/home/HomePage';
import type { RouteConfig } from '../Shared/UI/router/RouteRenderer.types';

export const AppRouter = {
  layout: '',
  routes: [
    { path: '/', element: PortfolioHomePage },
    { path: '/login', element: LoginPage },
    { path: '/register', element: RegisterPage },
    { path: '/dashboard', element: DashboardPage },
  ],
} satisfies RouteConfig;

export default AppRouter;
