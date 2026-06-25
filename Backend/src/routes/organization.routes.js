import express from 'express';
import { verifyToken, requireSuperAdmin } from '../middleware/auth.js';
import {
  getAllOrganizationsHandler,
  createOrganizationHandler,
  getPublicOrganizationsHandler
} from '../controllers/organization.controller.js';

const router = express.Router();

router.get('/', verifyToken, requireSuperAdmin, getAllOrganizationsHandler);
router.post('/', verifyToken, requireSuperAdmin, createOrganizationHandler);
router.get('/public', getPublicOrganizationsHandler);

export default router;