import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getPublicOrgs, checkFlag } from './api.js';
import ResultCard from './components/ResultCard.jsx';

const App = () => {
  const [orgs, setOrgs] = useState([]);
  const [orgId, setOrgId] = useState('');
  const [flagKey, setFlagKey] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPublicOrgs().then(setOrgs).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setLoading(true);
    try {
      setResult(await checkFlag(orgId, flagKey.trim()));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <nav className="bg-slate-900 px-7 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">🚩</span>
          <h1 className="text-white text-[17px] font-bold tracking-tight">Feature Flag System</h1>
        </div>
        <span className="bg-linear-to-r from-teal-500 to-cyan-500 text-white px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-lg shadow-teal-500/20">
          END USER
        </span>
      </nav>

      <div className="flex-1 flex items-center justify-center p-5">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-teal-500 via-cyan-500 to-sky-500 flex items-center justify-center text-3xl shadow-lg shadow-teal-500/30">
              🔍
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Feature Flag Checker</h2>
            <p className="text-sm text-slate-500 mt-1.5">
              Select your organization and enter a feature key<br />to check if it's enabled for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Your Organization</label>
              <select
                value={orgId}
                onChange={(e) => setOrgId(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all bg-white"
              >
                <option value="">{orgs.length ? 'Select your organization…' : 'Loading organizations…'}</option>
                {orgs.map((o) => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Feature Key</label>
              <input
                value={flagKey}
                onChange={(e) => setFlagKey(e.target.value)}
                type="text"
                placeholder="e.g. dark_mode, beta_ui, new_checkout"
                autoComplete="off"
                spellCheck="false"
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-linear-to-r from-teal-600 to-cyan-600 text-white font-bold text-sm hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 transition-all duration-200"
            >
              {loading ? 'Checking…' : 'Check Feature Status'}
            </button>
          </form>

          {result && <ResultCard result={result} />}
        </div>
      </div>

      <footer className="text-center py-5 text-xs text-slate-400">
        Feature Flag Management System — End User Portal
      </footer>
    </div>
  );
};

export default App;