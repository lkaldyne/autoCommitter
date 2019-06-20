const crypto_lib = require('crypto');

const key = process.env.ENCRYPTION_KEY || 'hgjfhgjtuekulinthgtijuthsrftczqq';
const algorithm = process.env.ENCRYPTION_ALGORITHM || 'aes256';
const inputEncoding = process.env.ENCRYPTION_INPUT_ENCODING || 'utf8';
const outputEncoding = 'hex';

export function encrypt(raw_data: string): string {
  const iv = crypto_lib.randomBytes(16); // IV length
  const cipher = crypto_lib.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(raw_data, inputEncoding, outputEncoding);
  encrypted = encrypted.concat(cipher.final(outputEncoding));
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(encryptedData: string): string {
  const textParts = encryptedData.split(':');
  const iv = Buffer.from(textParts[0], 'hex');
  const encryptedText = Buffer.from(textParts[1], 'hex');
  const decipher = crypto_lib.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText, outputEncoding, inputEncoding);
  decrypted = decrypted.concat(decipher.final(inputEncoding));
  return decrypted.toString();
}
