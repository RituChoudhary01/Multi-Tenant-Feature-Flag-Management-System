const ResultCard = ({ result }) => {
  if (!result.exists) {
    return (
      <div className="mt-6 rounded-2xl p-7 text-center bg-amber-50 border-2 border-amber-200">
        <div className="text-5xl mb-3">❓</div>
        <div className="text-xl font-extrabold text-amber-700 mb-2">Feature Not Found</div>
        <p className="text-sm text-slate-600 leading-relaxed">
          The flag <span className="font-mono bg-amber-100 px-2 py-0.5 rounded text-amber-800">{result.flag_key}</span> does not exist for this organization.
        </p>
        <span className="inline-block mt-3 bg-black/5 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
          📁 {result.organization}
        </span>
      </div>
    );
  }

  if (result.enabled) {
    return (
      <div className="mt-6 rounded-2xl p-7 text-center bg-emerald-50 border-2 border-emerald-200">
        <div className="text-5xl mb-3">✅</div>
        <div className="text-xl font-extrabold text-emerald-700 mb-2">Feature Enabled</div>
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong className="text-slate-800">{result.flag_name}</strong><br />
          <span className="font-mono bg-emerald-100 px-2 py-0.5 rounded text-emerald-800">{result.flag_key}</span> is <strong>active</strong> for your organization.
        </p>
        <span className="inline-block mt-3 bg-black/5 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
          📁 {result.organization}
        </span>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl p-7 text-center bg-red-50 border-2 border-red-200">
      <div className="text-5xl mb-3">🚫</div>
      <div className="text-xl font-extrabold text-red-700 mb-2">Feature Disabled</div>
      <p className="text-sm text-slate-600 leading-relaxed">
        <strong className="text-slate-800">{result.flag_name}</strong><br />
        <span className="font-mono bg-red-100 px-2 py-0.5 rounded text-red-800">{result.flag_key}</span> is currently <strong>turned off</strong> for your organization.
      </p>
      <span className="inline-block mt-3 bg-black/5 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
        📁 {result.organization}
      </span>
    </div>
  );
};

export default ResultCard;