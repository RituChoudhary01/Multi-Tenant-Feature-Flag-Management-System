import { useState } from 'react';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

const parseJwt = (token) => JSON.parse(atob(token.split('.')[1]));

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('sa_token'));

  const handleLogin = (newToken) => {
    localStorage.setItem('sa_token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('sa_token');
    setToken(null);
  };

  if (!token) return <Login onLogin={handleLogin} />;

  const { email } = parseJwt(token);
  return <Dashboard token={token} email={email} onLogout={handleLogout} />;
};

export default App;