const API = 'http://localhost:4000/api';

export const getPublicOrgs = async () => {
  const res = await fetch(`${API}/organizations/public`);
  const json = await res.json();
  return json.data;
};

export const checkFlag = async (organizationId, flagKey) => {
  const res = await fetch(`${API}/flags/check?organization_id=${organizationId}&flag_key=${encodeURIComponent(flagKey)}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json.data;
};