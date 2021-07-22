import Generic from './Generic';

/**
 * User is the model for a entity that connect to the system.
 */
class User extends Generic {
  firstName!: string;

  lastName!: string;

  username!: string;

  password!: string;

  picture!: string;

  email!: string;

  // Check authorization, the value can be 'admin' or 'user'.
  role!: string;

  // set default table name.
  static get tableName() {
    return 'user';
  }
}

export default User;
