import { useState } from 'react';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';

const AuthPage = ({ onAuth }) => {
  const [tab, setTab] = useState('login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
        <div className="text-center mb-7">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-blue-500 via-cyan-500 to-sky-500 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/30">
            ⚙️
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Admin Portal</h2>
          <p className="text-sm text-slate-500 mt-1.5">Manage your organization's feature flags</p>
        </div>

        <div className="flex border-b-2 border-slate-100 mb-6">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 pb-3 text-sm font-semibold transition-colors border-b-2 -mb-0.5 ${
              tab === 'login' ? 'text-blue-600 border-blue-600' : 'text-slate-400 border-transparent'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 pb-3 text-sm font-semibold transition-colors border-b-2 -mb-0.5 ${
              tab === 'signup' ? 'text-blue-600 border-blue-600' : 'text-slate-400 border-transparent'
            }`}
          >
            Sign Up
          </button>
        </div>

        {tab === 'login' ? <LoginForm onAuth={onAuth} /> : <SignupForm onAuth={onAuth} />}
      </div>
    </div>
  );
};

export default AuthPage;