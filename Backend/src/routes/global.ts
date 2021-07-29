import express from 'express';

import {
  getUserAll, getUserByID, createUser, updateUser, deleteUser, getUserPagination,
} from '../handlers/user';

/**
 * Endpoint route for global request.
 */

// Initialize the router.
const r = express.Router();

/**
 * Route for user requests.
 */
// Get all users.
r.get('/users', getUserAll);
// Get all users.
r.get('/users/pagination', getUserPagination);
// Get a user by id.
r.get('/users/:userId', getUserByID);
// Create a user.
r.post('/users', createUser);
// Update a user.
r.put('/users/:userId', updateUser);
// Delete a user.
r.delete('/users/:userId', deleteUser);
// TODO: Get user pagination.

export default r;
