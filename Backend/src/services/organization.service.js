import db from '../config/db.js';
import { AppError } from '../utils/AppError.js';

export const getAllOrganizations = () => {
  return db.prepare(`
    SELECT
      o.id, o.name, o.slug, o.created_at,
      COUNT(DISTINCT u.id) AS admin_count,
      COUNT(DISTINCT f.id) AS flag_count
    FROM organizations o
    LEFT JOIN users         u ON u.organization_id = o.id
    LEFT JOIN feature_flags f ON f.organization_id = o.id
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `).all();
};

export const createOrganization = (name) => {
  if (!name?.trim()) {
    throw new AppError(400, 'Organization name is required');
  }

  const slug = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  try {
    const { lastInsertRowid } = db.prepare(
      'INSERT INTO organizations (name, slug) VALUES (?, ?)'
    ).run(name.trim(), slug);

    return db.prepare('SELECT * FROM organizations WHERE id = ?').get(lastInsertRowid);
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      throw new AppError(409, 'Organization with this name already exists');
    }
    throw err;
  }
};

export const getPublicOrganizations = () => {
  return db.prepare('SELECT id, name FROM organizations ORDER BY name ASC').all();
};