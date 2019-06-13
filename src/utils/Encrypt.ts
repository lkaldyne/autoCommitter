const crypto_lib = require('crypto');


const key = process.env.ENCRYPTION_KEY || "secret";
const algorithm = process.env.ENCRYPTION_ALGORITHM || 'aes256';
const inputEncoding = process.env.ENCRYPTION_INPUT_ENCODING || 'utf8';
const outputEncoding = process.env.ENCRYPTION_OUTPUT_ENCODING || 'hex';


export function encrypt(raw_data: string): string {
    var cipher = crypto_lib.createCipher(algorithm, key);
    var encrypted = cipher.update(raw_data, inputEncoding, outputEncoding);
    encrypted += cipher.final(outputEncoding)
    return encrypted
}

export function decrypt(encrypted_data: string): string {
    var decipher = crypto_lib.createDecipher(algorithm, key);
    var decrypted = decipher.update(encrypted_data, outputEncoding, inputEncoding);
    decrypted += decipher.final(inputEncoding)
    return decrypted
}