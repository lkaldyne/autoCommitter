import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';
import * as cryptoUtils from '../utils/Encrypt';

// User model config
const UserSchema: mongoose.Schema<any> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  github_token: { type: String, required: true },
  commitsPerDay: { type: Number },
  commitsPerWeek: { type: Number },
});

UserSchema.plugin(uniqueValidator);

export interface userModel {
    username: string,
    password: string,
    github_token: string,
    id: string
    commitsPerDay: number,
    commitsPerWeek: number,
    save: (err: Error) => void
}

export const User: mongoose.Model<any> = mongoose.model('User', UserSchema);

export async function saveUser(newUser: userModel, callback: any) {
  const encryptedToken = await cryptoUtils.encrypt(newUser.github_token);
  newUser.github_token = encryptedToken;

  bcrypt.genSalt(10, (err: Error, salt: string) => {
    if (err) console.error(err);
    bcrypt.hash(newUser.password, salt, (err2: Error, hash: string) => {
      if (err2) console.error(err2);
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
