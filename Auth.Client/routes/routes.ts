import HomePage from '../components/home/HomePage';
import LoginPage from '../components/login/LoginPage';
import RegisterPage from '../components/register/RegisterPage';
import type { RouteConfig } from 'shared-ui/router/RouteRenderer.types';

export const AuthRouter = {
  layout: '',
  routes: [
    { index: true, element: HomePage },
    { path: 'login', element: LoginPage },
    { path: 'register', element: RegisterPage },
  ],
} satisfies RouteConfig;

export default AuthRouter;
