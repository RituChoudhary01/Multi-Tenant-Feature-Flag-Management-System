import db from '../config/db.js';
import { AppError } from '../utils/AppError.js';

export const checkFlag = async (organization_id, flag_key) => {
  if (!organization_id || !flag_key) {
    throw new AppError(400, 'organization_id and flag_key are required');
  }

  const orgResult = await db.query('SELECT id, name FROM organizations WHERE id = $1', [organization_id]);
  const org = orgResult.rows[0];
  if (!org) throw new AppError(404, 'Organization not found');

  const flagResult = await db.query(
    'SELECT * FROM feature_flags WHERE key = $1 AND organization_id = $2',
    [flag_key.trim().toLowerCase(), organization_id]
  );
  const flag = flagResult.rows[0];

  return {
    organization: org.name,
    flag_key: flag_key.toLowerCase(),
    flag_name: flag?.name ?? null,
    enabled: flag ? flag.enabled === 1 : false,
    exists: !!flag
  };
};

export const getFlagsByOrg = async (organization_id) => {
  const result = await db.query(
    'SELECT * FROM feature_flags WHERE organization_id = $1 ORDER BY created_at DESC',
    [organization_id]
  );
  return result.rows;
};

export const createFlag = async (key, name, enabled, organization_id) => {
  if (!key || !name) {
    throw new AppError(400, 'key and name are required');
  }

  const safeKey = key.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  if (!safeKey) {
    throw new AppError(400, 'key must contain at least one valid character');
  }

  try {
    const result = await db.query(
      'INSERT INTO feature_flags (key, name, enabled, organization_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [safeKey, name.trim(), enabled ? 1 : 0, organization_id]
    );
    return result.rows[0];
  } catch (err) {
    if (err.code === '23505') {
      throw new AppError(409, `Flag key "${safeKey}" already exists in your organization`);
    }
    throw err;
  }
};

export const updateFlag = async (id, organization_id, updates) => {
  const flagResult = await db.query(
    'SELECT * FROM feature_flags WHERE id = $1 AND organization_id = $2',
    [id, organization_id]
  );
  const flag = flagResult.rows[0];
  if (!flag) throw new AppError(404, 'Feature flag not found');

  const name = updates.name ?? flag.name;
  const enabled = updates.enabled !== undefined ? (updates.enabled ? 1 : 0) : flag.enabled;

  const result = await db.query(
    'UPDATE feature_flags SET name = $1, enabled = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
    [name, enabled, flag.id]
  );
  return result.rows[0];
};

export const deleteFlag = async (id, organization_id) => {
  const flagResult = await db.query(
    'SELECT id FROM feature_flags WHERE id = $1 AND organization_id = $2',
    [id, organization_id]
  );
  const flag = flagResult.rows[0];
  if (!flag) throw new AppError(404, 'Feature flag not found');

  await db.query('DELETE FROM feature_flags WHERE id = $1', [flag.id]);
  return { id: flag.id };
};