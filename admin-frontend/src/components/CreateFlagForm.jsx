import { useState } from 'react';
import toast from 'react-hot-toast';
import { createFlag } from '../api.js';

const CreateFlagForm = ({ token, onCreated }) => {
  const [key, setKey] = useState('');
  const [name, setName] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const previewKey = key.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  const showPreview = previewKey && previewKey !== key.toLowerCase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const flag = await createFlag(key, name, enabled, token);
      toast.success(`Flag "${flag.key}" created!`);
      setKey('');
      setName('');
      setEnabled(false);
      onCreated();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
      <h3 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-sm">+</span>
        New Feature Flag
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Flag Key</label>
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            type="text"
            placeholder="e.g. dark_mode"
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
          {showPreview && (
            <div className="mt-1.5 text-xs text-slate-500 font-mono bg-slate-50 px-2.5 py-1.5 rounded-lg">
              Will be saved as: {previewKey}
            </div>
          )}
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Display Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="e.g. Dark Mode"
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        </div>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
          <span className="text-sm font-medium text-slate-700">Enabled by default</span>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 transition-all duration-200"
        >
          {loading ? 'Creating…' : 'Create Flag'}
        </button>
      </form>
    </div>
  );
};

export default CreateFlagForm;