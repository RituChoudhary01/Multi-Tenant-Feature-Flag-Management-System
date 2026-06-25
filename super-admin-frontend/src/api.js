const API = 'http://localhost:4000/api';

const request = async (method, path, body, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(API + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json.data;
};

export const login = (email, password) =>
  request('POST', '/auth/super-admin/login', { email, password });

export const getOrganizations = (token) =>
  request('GET', '/organizations', null, token);

export const createOrganization = (name, token) =>
  request('POST', '/organizations', { name }, token);