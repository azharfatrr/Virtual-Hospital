import Generic from './Generic';

/**
 * Device is the model for IoT devices that connect to the server.
 */
class Device extends Generic {
  roomTemp: number;

  roomRh: number;

  userTemp: number;

  userSpo2: number;

  userBpm: number;

  condition: string;

  /**
  * Type check that will validate if the input is a valid new user.
  */
  public static isDevice = (input: any): input is Device => {
    try {
      // Validate that each input properties are in the schema.
      const validProperties = ['id', 'roomTemp', 'roomRh', 'userTemp', 'userSpo2',
        'userBpm', 'condition'];
      const inputProperties = Object.keys(input);

      const valid = inputProperties.every((property) => validProperties.includes(property));
      if (!valid) {
        throw Error;
      }

      // Validate the type of input
      if (!input.id || typeof input.id !== 'string') return false;
      if (input.roomTemp && typeof input.roomTemp !== 'number') return false;
      if (input.roomRh && typeof input.roomRh !== 'number') return false;
      if (input.userTemp && typeof input.userTemp !== 'number') return false;
      if (input.userSpo2 && typeof input.userSpo2 !== 'number') return false;
      if (input.userBpm && typeof input.userBpm !== 'number') return false;
      if (input.condition && typeof input.condition !== 'string') return false;

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
