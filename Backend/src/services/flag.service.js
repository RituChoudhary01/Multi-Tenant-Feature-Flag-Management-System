import db from '../config/db.js';
import { AppError } from '../utils/AppError.js';

export const checkFlag = (organization_id, flag_key) => {
  if (!organization_id || !flag_key) {
    throw new AppError(400, 'organization_id and flag_key are required');
  }

  const org = db.prepare('SELECT id, name FROM organizations WHERE id = ?').get(organization_id);
  if (!org) throw new AppError(404, 'Organization not found');

  const flag = db.prepare(
    'SELECT * FROM feature_flags WHERE key = ? AND organization_id = ?'
  ).get(flag_key.trim().toLowerCase(), organization_id);

  return {
    organization: org.name,
    flag_key: flag_key.toLowerCase(),
    flag_name: flag?.name ?? null,
    enabled: flag ? flag.enabled === 1 : false,
    exists: !!flag
  };
};

export const getFlagsByOrg = (organization_id) => {
  return db.prepare(
    'SELECT * FROM feature_flags WHERE organization_id = ? ORDER BY created_at DESC'
  ).all(organization_id);
};

export const createFlag = (key, name, enabled, organization_id) => {
  if (!key || !name) {
    throw new AppError(400, 'key and name are required');
  }

  const safeKey = key.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  if (!safeKey) {
    throw new AppError(400, 'key must contain at least one valid character');
  }

  try {
    const { lastInsertRowid } = db.prepare(
      'INSERT INTO feature_flags (key, name, enabled, organization_id) VALUES (?, ?, ?, ?)'
    ).run(safeKey, name.trim(), enabled ? 1 : 0, organization_id);

    return db.prepare('SELECT * FROM feature_flags WHERE id = ?').get(lastInsertRowid);
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      throw new AppError(409, `Flag key "${safeKey}" already exists in your organization`);
    }
    throw err;
  }
};

export const updateFlag = (id, organization_id, updates) => {
  const flag = db.prepare(
    'SELECT * FROM feature_flags WHERE id = ? AND organization_id = ?'
  ).get(id, organization_id);
  if (!flag) throw new AppError(404, 'Feature flag not found');

  const name = updates.name ?? flag.name;
  const enabled = updates.enabled !== undefined ? (updates.enabled ? 1 : 0) : flag.enabled;

  db.prepare(
    'UPDATE feature_flags SET name = ?, enabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(name, enabled, flag.id);

  return db.prepare('SELECT * FROM feature_flags WHERE id = ?').get(flag.id);
};

export const deleteFlag = (id, organization_id) => {
  const flag = db.prepare(
    'SELECT id FROM feature_flags WHERE id = ? AND organization_id = ?'
  ).get(id, organization_id);
  if (!flag) throw new AppError(404, 'Feature flag not found');

  db.prepare('DELETE FROM feature_flags WHERE id = ?').run(flag.id);
  return { id: flag.id };
};