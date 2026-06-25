import express from 'express';
import { superAdminLoginHandler, adminSignupHandler, adminLoginHandler } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/super-admin/login', superAdminLoginHandler);
router.post('/admin/signup', adminSignupHandler);
router.post('/admin/login', adminLoginHandler);

export default router;