import jwt from 'jsonwebtoken';
import { ApiResponse } from '../utils/ApiResponse.js';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export const verifyToken = (req, res, next) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return ApiResponse.error(res, 'Authentication required', 401);

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return ApiResponse.error(res, 'Invalid or expired token', 401);
  }
};

export const requireSuperAdmin = (req, res, next) => {
  if (req.user?.role !== 'super_admin') {
    return ApiResponse.error(res, 'Super admin access required', 403);
  }
  next();
};

export const requireOrgAdmin = (req, res, next) => {
  if (req.user?.role !== 'org_admin') {
    return ApiResponse.error(res, 'Organization admin access required', 403);
  }
  next();
};