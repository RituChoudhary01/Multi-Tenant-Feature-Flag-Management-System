import db from '../config/db.js';
import { AppError } from '../utils/AppError.js';

export const getAllOrganizations = async () => {
  const result = await db.query(`
    SELECT
      o.id, o.name, o.slug, o.created_at,
      COUNT(DISTINCT u.id)::int AS admin_count,
      COUNT(DISTINCT f.id)::int AS flag_count
    FROM organizations o
    LEFT JOIN users         u ON u.organization_id = o.id
    LEFT JOIN feature_flags f ON f.organization_id = o.id
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `);
  return result.rows;
};

export const createOrganization = async (name) => {
  if (!name?.trim()) {
    throw new AppError(400, 'Organization name is required');
  }

  const slug = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  try {
    const result = await db.query(
      'INSERT INTO organizations (name, slug) VALUES ($1, $2) RETURNING *',
      [name.trim(), slug]
    );
    return result.rows[0];
  } catch (err) {
    if (err.code === '23505') {
      throw new AppError(409, 'Organization with this name already exists');
    }
    throw err;
  }
};

export const getPublicOrganizations = async () => {
  const result = await db.query('SELECT id, name FROM organizations ORDER BY name ASC');
  return result.rows;
};