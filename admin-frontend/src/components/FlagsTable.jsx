import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateFlag, deleteFlag } from '../api.js';

const fmtDate = (s) =>
  new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

const FlagsTable = ({ flags, token, onChange }) => {
  const [busyId, setBusyId] = useState(null);

  const handleToggle = async (flag) => {
    const newEnabled = flag.enabled !== 1;
    setBusyId(flag.id);
    try {
      await updateFlag(flag.id, { enabled: newEnabled }, token);
      onChange();
    } catch (err) {
      toast.error('Failed to update flag: ' + err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (flag) => {
    if (!confirm(`Delete flag "${flag.name}"?\nThis cannot be undone.`)) return;
    try {
      await deleteFlag(flag.id, token);
      toast.success('Flag deleted');
      onChange();
    } catch (err) {
      toast.error('Failed to delete: ' + err.message);
    }
  };

  if (!flags.length) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-3">🚩</div>
        <p className="text-slate-400 text-base">No feature flags yet.<br />Create your first flag from the sidebar!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['Key', 'Display Name', 'Status', 'Toggle', 'Updated', 'Actions'].map((h) => (
              <th key={h} className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {flags.map((f) => (
            <tr key={f.id} className="hover:bg-blue-50/40 transition-colors">
              <td className="px-4 py-4 rounded-l-xl">
                <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-indigo-50 text-indigo-600">{f.key}</span>
              </td>
              <td className="px-4 py-4 font-bold text-slate-800">{f.name}</td>
              <td className="px-4 py-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${f.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                  {f.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </td>
              <td className="px-4 py-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={f.enabled === 1}
                    disabled={busyId === f.id}
                    onChange={() => handleToggle(f)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-emerald-500 peer-disabled:opacity-50 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 shadow-inner"></div>
                </label>
              </td>
              <td className="px-4 py-4 text-sm text-slate-400">{fmtDate(f.updated_at)}</td>
              <td className="px-4 py-4 rounded-r-xl">
                <button
                  onClick={() => handleDelete(f)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlagsTable;