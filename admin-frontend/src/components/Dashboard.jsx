import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getFlags } from '../api.js';
import CreateFlagForm from './CreateFlagForm.jsx';
import FlagsTable from './FlagsTable.jsx';

const Dashboard = ({ token, orgName, onLogout }) => {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadFlags = async () => {
    setLoading(true);
    setError(false);
    try {
      setFlags(await getFlags(token));
    } catch (err) {
      if (err.message === 'Invalid or expired token') return onLogout();
      toast.error(err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFlags();
  }, []);

  const enabledCount = flags.filter((f) => f.enabled === 1).length;

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-slate-900 px-7 h-16 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🚩</span>
          <h1 className="text-white text-[17px] font-bold tracking-tight">Feature Flag System</h1>
        </div>
        <div className="flex items-center gap-3.5">
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-lg shadow-blue-500/20">
            ORG ADMIN
          </span>
          <span className="text-sm text-white/60">{orgName ? `📁 ${orgName}` : ''}</span>
          <button
            onClick={onLogout}
            className="bg-white/10 border border-white/10 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-white/20 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="flex gap-6 p-7 max-w-6xl mx-auto items-start">
        <div className="w-72 flex-shrink-0">
          <CreateFlagForm token={token} onCreated={loadFlags} />
        </div>

        <div className="flex-1 min-w-0">
          {!loading && !error && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-2xl py-5 px-5 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-3xl font-extrabold text-slate-900">{flags.length}</div>
                  <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">🚩</div>
                </div>
                <div className="text-xs text-slate-500 font-semibold">Total Flags</div>
              </div>
              <div className="bg-white rounded-2xl py-5 px-5 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-3xl font-extrabold text-emerald-500">{enabledCount}</div>
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">✓</div>
                </div>
                <div className="text-xs text-slate-500 font-semibold">Enabled</div>
              </div>
              <div className="bg-white rounded-2xl py-5 px-5 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-3xl font-extrabold text-red-500">{flags.length - enabledCount}</div>
                  <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-red-600">✕</div>
                </div>
                <div className="text-xs text-slate-500 font-semibold">Disabled</div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2">
              <span>🚩</span> Feature Flags
            </h3>
            {loading && <div className="text-center py-10 text-slate-400 text-sm">Loading flags…</div>}
            {error && <div className="text-center py-10 text-red-400 text-sm">⚠ Failed to load flags</div>}
            {!loading && !error && <FlagsTable flags={flags} token={token} onChange={loadFlags} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;