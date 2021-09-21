import { Request, Response } from 'express';
import log4js from 'log4js';

import { isValidId } from '../helpers/validator';
import { apiVersion } from '../configs/server';
import Device from '../models/Device';
import { captureErrorLog } from '../helpers/log';
import { ErrorContainer } from '../types/error';
import User from '../models/User';

const deviceLogger = log4js.getLogger('device');

/**
 * GET /api/v1/devices/:deviceId
 * getDeviceById is a function for getting device status by it's id.
 * @param req.params.deviceId - id of the device
 */
export const getDeviceById = async (req: Request, res: Response) => {
  try {
    // Get the params from the request.
    const { deviceId } = req.params;

    // Validate if userId is valid.
    if (!isValidId(deviceId)) {
      return res.status(400).json({
        apiVersion,
        error: {
          code: 400,
          message: 'Failed during input validation',
        },
      });
    }

    // Get the device by it's id.
    const device = await Device.query().findById(deviceId);
    // Check if user is found.
    if (!device) {
      return res.status(404).json({
        apiVersion,
        error: {
          code: 404,
          message: 'Device with specified id not exist',
        },
      });
    }

    // Return response with user public data.
    return res.json({
      apiVersion,
      data: device,
    });
  } catch (err) {
    const message = `Error while getting device with id: ${req.params.deviceId}`;
    captureErrorLog(deviceLogger, message, err);

    // Return error response.
    return res.status(500).json({
      apiVersion,
      error: {
        code: 500,
        message,
      },
    });
  }
};

/**
 * POST /api/v1/devices
 * createDevice is a handle for creating new device.
 * @param req.body - Device models.
 */
export const createDevice = async (req: Request, res: Response) => {
  try {
    // Validate the input.
    const errors = new ErrorContainer();

    // Get the object form req.body
    const device = req.body;

    // Validate all request body needed is exist.
    if (!Device.isDevice(device)) {
      errors.addError('device', 'body', 'Body object is not valid, must a Device models');
    }

    // Check if device is already exist.
    if (await Device.query().findById(device.id)) {
      errors.addError('device', 'body.id', 'Device with specified id already exist');
    }

    // If there exist an error during validation, return the error.
    if (errors.hasErrors()) {
      // Send the error message.
      return res.status(400).json({
        apiVersion,
        error: {
          code: 400,
          message: 'Failed during input validation',
          errors: errors.getErrors(),
        },
      });
    }

    // Create the new device to the database.
    const newDevice = await Device.query().insert(device);

    // Response the user.
    return res.status(201).json({
      apiVersion,
      data: newDevice,
    });
  } catch (err) {
    const message = 'Could not create new device';
    captureErrorLog(deviceLogger, message, err);

    // Return error response.
    return res.status(500).json({
      apiVersion,
      error: {
        code: 500,
        message,
      },
    });
  }
};

/**
 * POST /api/v1/devices/deviceId
 * createDevice is a handle for creating new device.
 * @param req.params.deviceId - id of the device.
 * @param req.body - Device models.
 */
export const updateDeviceById = async (req: Request, res: Response) => {
  try {
    // Get the params from the request.
    const { deviceId } = req.params;

    // Validate the input.
    const errors = new ErrorContainer();

    // Get the object form req.body
    const device = req.body;

    // Make sure the devide id not changed.
    device.id = deviceId;

    // Validate all request body needed is exist.
    if (!Device.isDevice(device)) {
      errors.addError('device', 'body', 'Body object is not valid, must a Device models');
    }

    // If there exist an error during validation, return the error.
    if (errors.hasErrors()) {
      // Send the error message.
      return res.status(400).json({
        apiVersion,
        error: {
          code: 400,
          message: 'Failed during input validation',
          errors: errors.getErrors(),
        },
      });
    }

    // Update the last updated time of the device.
    device.updatedAt = new Date();

    // Update the device to the database.
    const updatedDevice = await Device.query().patchAndFetchById(deviceId, device);

    // Response the user.
    return res.status(200).json({
      apiVersion,
      data: updatedDevice,
    });
  } catch (err) {
    const message = 'Could not create new device';
    captureErrorLog(deviceLogger, message, err);

    // Return error response.
    return res.status(500).json({
      apiVersion,
      error: {
        code: 500,
        message,
      },
    });
  }
};

/**
 * DELETE /api/v1/users/:userId/devices
 * deleteUser is a function for handle request deleting user data.
 * The user must be authorized.
 * @param req.params.userId - id of the user.
 */
export const deleteDeviceById = async (req: Request, res: Response) => {
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

    // Query user from database.
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

    // Get the device id from user object.
    const { deviceId } = user;

    // Remove the device from the database.
    await Device.query().deleteById(deviceId);

    // Return response with user data.
    return res.json({
      apiVersion,
      deleted: true,
    });
  } catch (err) {
    captureErrorLog(deviceLogger, 'Could not delete user data', err);

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
