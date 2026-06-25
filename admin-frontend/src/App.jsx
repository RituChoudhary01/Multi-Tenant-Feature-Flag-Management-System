import { useState } from 'react';
import AuthPage from './components/AuthPage.jsx';
import Dashboard from './components/Dashboard.jsx';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [orgName, setOrgName] = useState(localStorage.getItem('admin_org_name') || '');

  const handleAuth = (data) => {
    localStorage.setItem('admin_token', data.token);
    localStorage.setItem('admin_org_name', data.organization_name || '');
    setToken(data.token);
    setOrgName(data.organization_name || '');
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_org_name');
    setToken(null);
    setOrgName('');
  };

  if (!token) return <AuthPage onAuth={handleAuth} />;
  return <Dashboard token={token} orgName={orgName} onLogout={handleLogout} />;
};

export default App;
