const fmtDate = (s) =>
  new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

const OrgsTable = ({ orgs }) => {
  if (!orgs.length) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-3">📭</div>
        <p className="text-slate-400 text-base">No organizations yet.<br />Create your first one from the sidebar!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['ID', 'Organization', 'Slug', 'Admins', 'Flags', 'Created'].map((h) => (
              <th key={h} className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-4 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orgs.map((o) => (
            <tr key={o.id} className="hover:bg-indigo-50/50 rounded-xl transition-colors">
              <td className="px-4 py-4 rounded-l-xl">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-600">#{o.id}</span>
              </td>
              <td className="px-4 py-4 font-bold text-slate-800">{o.name}</td>
              <td className="px-4 py-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-100 text-emerald-700">{o.slug}</span>
              </td>
              <td className="px-4 py-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                  {o.admin_count} admin{o.admin_count !== 1 ? 's' : ''}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                  {o.flag_count} flag{o.flag_count !== 1 ? 's' : ''}
                </span>
              </td>
              <td className="px-4 py-4 rounded-r-xl text-sm text-slate-400">{fmtDate(o.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrgsTable;