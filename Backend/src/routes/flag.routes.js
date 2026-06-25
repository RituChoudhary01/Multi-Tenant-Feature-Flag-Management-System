import express from 'express';
import { verifyToken, requireOrgAdmin } from '../middleware/auth.js';
import {
  checkFlagHandler,
  getFlagsHandler,
  createFlagHandler,
  updateFlagHandler,
  deleteFlagHandler
} from '../controllers/flag.controller.js';

const router = express.Router();

router.get('/check', checkFlagHandler);

router.get('/', verifyToken, requireOrgAdmin, getFlagsHandler);
router.post('/', verifyToken, requireOrgAdmin, createFlagHandler);
router.put('/:id', verifyToken, requireOrgAdmin, updateFlagHandler);
router.delete('/:id', verifyToken, requireOrgAdmin, deleteFlagHandler);

export default router;