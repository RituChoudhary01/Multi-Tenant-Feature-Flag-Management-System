import { useState } from 'react';
import toast from 'react-hot-toast';
import { createOrganization } from '../api.js';

const CreateOrgForm = ({ token, onCreated }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const org = await createOrganization(name, token);
      toast.success(`"${org.name}" created!`);
      setName('');
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
        <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm">+</span>
        New Organization
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Organization Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="e.g. Acme Corp"
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 transition-all duration-200"
        >
          {loading ? 'Creating…' : 'Create Organization'}
        </button>
      </form>
    </div>
  );
};

export default CreateOrgForm;