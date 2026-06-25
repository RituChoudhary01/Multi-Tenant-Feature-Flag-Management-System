import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import { AppError } from '../utils/AppError.js';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || 'superadmin@byepo.com';
const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin@123';

export const superAdminLogin = (email, password) => {
  if (email !== SUPER_ADMIN_EMAIL || password !== SUPER_ADMIN_PASSWORD) {
    throw new AppError(401, 'Invalid credentials');
  }
  const token = jwt.sign({ role: 'super_admin', email }, JWT_SECRET, { expiresIn: '8h' });
  return { token, role: 'super_admin', email };
};

export const adminSignup = (email, password, organization_id) => {
  if (!email || !password || !organization_id) {
    throw new AppError(400, 'email, password and organization_id are required');
  }

  const org = db.prepare('SELECT id, name FROM organizations WHERE id = ?').get(organization_id);
  if (!org) throw new AppError(400, 'Organization not found');

  if (db.prepare('SELECT id FROM users WHERE email = ?').get(email)) {
    throw new AppError(409, 'Email already registered');
  }

  const password_hash = bcrypt.hashSync(password, 10);
  const { lastInsertRowid } = db.prepare(
    'INSERT INTO users (email, password_hash, role, organization_id) VALUES (?, ?, ?, ?)'
  ).run(email, password_hash, 'org_admin', organization_id);

  const token = jwt.sign(
    { id: lastInsertRowid, role: 'org_admin', email, organization_id: Number(organization_id) },
    JWT_SECRET, { expiresIn: '8h' }
  );

  return {
    token, role: 'org_admin', email,
    organization_id: Number(organization_id),
    organization_name: org.name
  };
};

export const adminLogin = (email, password) => {
  if (!email || !password) {
    throw new AppError(400, 'email and password are required');
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ? AND role = ?').get(email, 'org_admin');
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    throw new AppError(401, 'Invalid credentials');
  }

  const org = db.prepare('SELECT name FROM organizations WHERE id = ?').get(user.organization_id);

  const token = jwt.sign(
    { id: user.id, role: 'org_admin', email: user.email, organization_id: user.organization_id },
    JWT_SECRET, { expiresIn: '8h' }
  );

  return {
    token, role: 'org_admin', email: user.email,
    organization_id: user.organization_id,
    organization_name: org?.name
  };
};