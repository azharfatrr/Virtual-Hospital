import Generic from './Generic';

/**
 * Device is the model for IoT devices that connect to the server.
 */
class Device extends Generic {
  // The id of device that used by the user.
  deviceId!: string;

  roomTemp: number;

  roomRH: number;

  userTemp: number;

  userSpO2: number;

  userBPM: number;

  /**
  * Type check that will validate if the input is a valid new user.
  */
  public static isDevice = (input: any): input is Device => {
    try {
      // Validate that each input properties are in the schema.
      const validProperties = ['deviceId', 'roomTemp', 'roomRH', 'userTemp', 'userSpO2', 'userBPM'];
      input.forEach((property: string) => {
        if (!validProperties.includes(property)) {
          throw new Error(`Invalid property: ${property}`);
        }
      });

      // Validate the type of input
      if (!input.deviceId || typeof input.deviceId !== 'string') return false;
      if (input.deviceId && typeof input.roomTemp !== 'number') return false;
      if (input.deviceId && typeof input.roomRH !== 'number') return false;
      if (input.deviceId && typeof input.userTemp !== 'number') return false;
      if (input.deviceId && typeof input.userSpO2 !== 'number') return false;
      if (input.deviceId && typeof input.userBPM !== 'number') return false;

      return true;
    } catch (err) {
      return false;
    }
  };

  // Set default table name.
  static get tableName() {
    return 'device';
  }
}



export default Device;
