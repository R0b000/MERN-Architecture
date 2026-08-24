import { AuthProvider } from '../auth.client/context/AuthContext';
import AuthApp from '../auth.client/AuthApp';

<ReactDOM></ReactDOM>.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AuthApp />
        <PortfolioApp />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
