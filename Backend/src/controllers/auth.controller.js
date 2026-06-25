import { superAdminLogin, adminSignup, adminLogin } from '../services/auth.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { handleError } from '../utils/handleError.js';

export const superAdminLoginHandler = (req, res) => {
  try {
    const { email, password } = req.body;
    const result = superAdminLogin(email, password);
    return ApiResponse.success(res, 'Login successful', result);
  } catch (error) {
    return handleError(res, error);
  }
};

export const adminSignupHandler = (req, res) => {
  try {
    const { email, password, organization_id } = req.body;
    const result = adminSignup(email, password, organization_id);
    return ApiResponse.success(res, 'Account created successfully', result, 201);
  } catch (error) {
    return handleError(res, error);
  }
};

export const adminLoginHandler = (req, res) => {
  try {
    const { email, password } = req.body;
    const result = adminLogin(email, password);
    return ApiResponse.success(res, 'Login successful', result);
  } catch (error) {
    return handleError(res, error);
  }
};