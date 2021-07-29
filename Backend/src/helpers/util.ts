// encodeBase64 returns encoded input string using base64Encoding.
export const encodeBase64 = (input: string): string => Buffer.from(input).toString('base64');

// decodeBase64 returns decoded input string using base64Encoding.
export const decodeBase64 = (input: string): string => Buffer.from(input, 'base64').toString();
