/**
 * Endpoint route for global request.
 */

import express from 'express';

import { createDevice, getDeviceById, updateDeviceById } from '../handlers/device';
import { login, logout, register } from '../handlers/auth';
import {
  getUserAll, getUserPagination,
} from '../handlers/user';

// Initialize the router.
const r = express.Router();

/**
 * Route for authentication login, register, and logout.
 */
// User register.
r.post('/auth/register', register);
// User login.
r.post('/auth/login', login);
// User logout.
r.post('/auth/logout', logout);

/**
 * Route for user requests.
 */
// Get all users.
r.get('/users', getUserAll);
// Get all users.
r.get('/users/pagination', getUserPagination);

/**
 * Route for device requests.
 */
r.get('/devices/:deviceId', getDeviceById);
r.post('/devices', createDevice);
r.put('/devices/:deviceId', updateDeviceById);

// Export the router.
export default r;
