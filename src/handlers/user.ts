import { Request, Response } from 'express';
import log4js from 'log4js';
import Objection from 'objection';
import { isValidId } from '../helpers/validator';
import { apiVersion } from '../configs/server';
import { captureErrorLog } from '../helpers/log';
import User, { isUser } from '../models/User';

const userLogger = log4js.getLogger('user');

/**
 * GET /api/v1/users
 * getUserAll is a function for handle request getting all user public data.
 */
export const getUserAll = async (req: Request, res: Response) => {
  try {
    // Query all user from database.
    const allUser = (await User.query()).map((user) => user.getPublicData());

    // Return response with user public data.
    return res.json({
      apiVersion,
      data: allUser,
    });
  } catch (err) {
    captureErrorLog(userLogger, 'Could not get all user', err);

    // Return error response.
    return res.status(500).json({
      apiVersion,
      error: {
        code: 500,
        message: 'Could not get all user',
      },
    });
  }
};

/**
 * GET /api/v1/users/:userId
 * getUserByID is a function for handle request get user public data by userId.
 * @param req.params.userId - id of the user.
 */
export const getUserByID = async (req: Request, res: Response) => {
  try {
    // Get user id from request.
    const { userId } = req.params;

    // Validate if userId is valid.
    if (!isValidId(userId)) {
      return res.status(400).json({
        apiVersion,
        error: {
          code: 400,
          message: 'Failed during input validation',
        },
      });
    }

    // Query all user from database.
    const user = await User.query().findById(userId);
    // Check if user is found.
    if (!user) {
      return res.status(404).json({
        apiVersion,
        error: {
          code: 404,
          message: 'User with specified id not exist',
        },
      });
    }

    // Return response with user public data.
    return res.json({
      apiVersion,
      data: user.getPublicData,
    });
  } catch (err) {
    captureErrorLog(userLogger, 'Could not get user data', err);

    // Return error response.
    return res.status(500).json({
      apiVersion,
      error: {
        code: 500,
        message: 'Could not get user data',
      },
    });
  }
};

/**
 * POST /api/v1/users
 * createUser is a function for handle request creating new user.
 * @param req.body - User models.
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    // Get the request body.
    const reqBody = req.body;

    // Validate if reqBody is user model.
    if (!isUser(reqBody)) {
      return res.status(400).json({
        apiVersion,
        error: {
          code: 400,
          message: 'Failed during input validation',
        },
      });
    }

    // Create new user.
    const user = await User.query().insert(reqBody);

    // Return response with user data.
    return res.status(201).json({
      apiVersion,
      data: user.getPublicData(),
    });
  } catch (err) {
    captureErrorLog(userLogger, 'Could not create user data', err);

    // Return error response.
    return res.status(500).json({
      apiVersion,
      error: {
        code: 500,
        message: 'Could not create user data',
      },
    });
  }
};

/**
 * PUT /api/v1/users/:userId
 * updateUser is a function for handle request updating user data.
 * @param req.params.userId - id of the user.
 * @param req.body - User models.
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    // Get the user id.
    const { userId } = req.params;
    // Get the request body.
    const reqBody = req.body;

    // Validate if userId is valid.
    if (!isValidId(userId)) {
      return res.status(400).json({
        apiVersion,
        error: {
          code: 400,
          message: 'Failed during input validation',
        },
      });
    }

    // Validate if reqBody is user model.
    if (!isUser(reqBody)) {
      return res.status(400).json({
        apiVersion,
        error: {
          code: 400,
          message: 'Failed during input validation',
        },
      });
    }

    // Update and fetch user data.
    const user = await User.query().updateAndFetchById(userId, reqBody);

    // Return response with user data.
    return res.status(201).json({
      apiVersion,
      data: user.getPublicData(),
    });
  } catch (err) {
    captureErrorLog(userLogger, 'Could not update user data', err);

    // Return error response.
    return res.status(500).json({
      apiVersion,
      error: {
        code: 500,
        message: 'Could not update user data',
      },
    });
  }
};

/**
 * DELETE /api/v1/users/:userId
 * deleteUser is a function for handle request deleting user data.
 * @param req.params.userId - id of the user.
 */
export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Get the user id.
    const { userId } = req.params;

    // Validate if userId is valid.
    if (!isValidId(userId)) {
      return res.status(400).json({
        apiVersion,
        error: {
          code: 400,
          message: 'Failed during input validation',
        },
      });
    }

    // Update and fetch user data.
    await User.query().deleteById(userId);

    // Return response with user data.
    return res.json({
      apiVersion,
      deleted: true,
    });
  } catch (err) {
    captureErrorLog(userLogger, 'Could not delete user data', err);

    // Return error response.
    return res.status(500).json({
      apiVersion,
      error: {
        code: 500,
        message: 'Could not delete user data',
      },
    });
  }
};
