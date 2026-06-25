const API = 'https://multi-tenant-feature-flag-management-lkjo.onrender.com/api';

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

export const getPublicOrgs = () => request('GET', '/organizations/public');

export const signup = (email, password, organization_id) =>
  request('POST', '/auth/admin/signup', { email, password, organization_id });

export const login = (email, password) =>
  request('POST', '/auth/admin/login', { email, password });

export const getFlags = (token) => request('GET', '/flags', null, token);

export const createFlag = (key, name, enabled, token) =>
  request('POST', '/flags', { key, name, enabled }, token);

export const updateFlag = (id, body, token) =>
  request('PUT', `/flags/${id}`, body, token);

export const deleteFlag = (id, token) =>
  request('DELETE', `/flags/${id}`, null, token);