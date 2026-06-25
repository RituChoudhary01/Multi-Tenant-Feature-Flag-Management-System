import { useState } from 'react';
import toast from 'react-hot-toast';
import { login } from '../api.js';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('superadmin@byepo.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email, password);
      toast.success('Welcome back!');
      onLogin(data.token);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-3xl shadow-lg shadow-indigo-500/30">
            🏢
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Super Admin Portal</h2>
          <p className="text-sm text-slate-500 mt-1.5">Feature Flag Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 transition-all duration-200"
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <p className="mt-5 text-xs text-slate-400 text-center">Default: SuperAdmin@123</p>
      </div>
    </div>
  );
};

export default Login;