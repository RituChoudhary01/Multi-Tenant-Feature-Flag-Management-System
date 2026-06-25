import {
  checkFlag,
  getFlagsByOrg,
  createFlag,
  updateFlag,
  deleteFlag
} from '../services/flag.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { handleError } from '../utils/handleError.js';

export const checkFlagHandler = (req, res) => {
  try {
    const { organization_id, flag_key } = req.query;
    const result = checkFlag(organization_id, flag_key);
    return ApiResponse.success(res, 'Flag status fetched', result);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getFlagsHandler = (req, res) => {
  try {
    const result = getFlagsByOrg(req.user.organization_id);
    return ApiResponse.success(res, 'Flags fetched successfully', result);
  } catch (error) {
    return handleError(res, error);
  }
};

export const createFlagHandler = (req, res) => {
  try {
    const { key, name, enabled = false } = req.body;
    const result = createFlag(key, name, enabled, req.user.organization_id);
    return ApiResponse.success(res, 'Flag created successfully', result, 201);
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateFlagHandler = (req, res) => {
  try {
    const result = updateFlag(req.params.id, req.user.organization_id, req.body);
    return ApiResponse.success(res, 'Flag updated successfully', result);
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteFlagHandler = (req, res) => {
  try {
    const result = deleteFlag(req.params.id, req.user.organization_id);
    return ApiResponse.success(res, 'Flag deleted successfully', result);
  } catch (error) {
    return handleError(res, error);
  }
};