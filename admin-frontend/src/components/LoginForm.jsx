import { useState } from 'react';
import toast from 'react-hot-toast';
import { login } from '../api.js';

const LoginForm = ({ onAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email, password);
      toast.success('Welcome back!');
      onAuth(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="admin@example.com"
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="••••••••"
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 transition-all duration-200"
      >
        {loading ? 'Signing in…' : 'Sign In →'}
      </button>
    </form>
  );
};

export default LoginForm;