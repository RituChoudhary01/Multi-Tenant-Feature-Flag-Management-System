import {
  getAllOrganizations,
  createOrganization,
  getPublicOrganizations
} from '../services/organization.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { handleError } from '../utils/handleError.js';

export const getAllOrganizationsHandler = async (req, res) => {
  try {
    const result = await getAllOrganizations();
    return ApiResponse.success(res, 'Organizations fetched successfully', result);
  } catch (error) {
    return handleError(res, error);
  }
};

export const createOrganizationHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await createOrganization(name);
    return ApiResponse.success(res, 'Organization created successfully', result, 201);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getPublicOrganizationsHandler = async (req, res) => {
  try {
    const result = await getPublicOrganizations();
    return ApiResponse.success(res, 'Organizations fetched successfully', result);
  } catch (error) {
    return handleError(res, error);
  }
};