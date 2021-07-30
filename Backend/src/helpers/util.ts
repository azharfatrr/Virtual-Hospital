import jsonwebtoken from 'jsonwebtoken';
import { jwtPayload } from '../types/jwt';

import User from '../models/User';
import { JWT_PRIVATE_KEY } from '../configs/passport';

// encodeBase64 returns encoded input string using base64Encoding.
export const encodeBase64 = (input: string): string => Buffer.from(input).toString('base64');

// decodeBase64 returns decoded input string using base64Encoding.
export const decodeBase64 = (input: string): string => Buffer.from(input, 'base64').toString();

/**
 * issueJWT is a function for creating a JWT token.
 * @param User - The user object.
 */
export const issueJWT = (user: User) => {
  // The user ID for data in payload.
  const { id } = user;

  // The expiration time for the JWT.
  const expiresIn = process.env.JWT_EXPIRE_TIME;

  // The payload for the JWT.
  const payload = {
    data: {
      user_id: id,
    },
    iat: Date.now(),
  } as jwtPayload;

  // Sign the token payload using the private key.
  const signedToken = jsonwebtoken.sign(payload, JWT_PRIVATE_KEY,
    { expiresIn, algorithm: 'RS256' });

  // Return the token.
  return signedToken;
};
