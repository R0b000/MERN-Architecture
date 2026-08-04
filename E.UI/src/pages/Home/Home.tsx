import useHomeLogic from './Home.logic';

const Home = () => {
  const { user, isAuthenticated, handleLogout } = useHomeLogic();

  return (
    <div className="-columns min-h-screen">
      <header className="-row justify-between items-center p-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-primary-700">E-Commerce</h1>
        {isAuthenticated && (
          <div className="-row gap-4 items-center">
            <span className="text-sm">Welcome, {user?.firstName || 'User'}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </header>
      <main className="-columns flex-1 p-6">
        <h2 className="text-xl font-semibold mb-4">Home</h2>
        <p className="text-gray-600">Welcome to the E-Commerce platform.</p>
      </main>
    </div>
  );
};

export default Home;
