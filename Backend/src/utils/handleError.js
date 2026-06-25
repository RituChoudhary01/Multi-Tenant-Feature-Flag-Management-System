import { ApiResponse } from './ApiResponse.js';

export const handleError = (res, err) => {
  console.error(err);
  const statusCode = err.status || 500;
  const message = err.status ? err.message : 'Something went wrong';
  return ApiResponse.error(res, message, statusCode);
};