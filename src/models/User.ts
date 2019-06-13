import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';
import * as crypto_utils from '../utils/Encrypt';

// User model config
const UserSchema: mongoose.Schema<any> = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    github_token: { type: String, required: true }
});

UserSchema.plugin(uniqueValidator);

export interface userModel {
    username: string,
    password: string,
    github_token: string,
    id: string
    save: (err: Error) => void
};

export const User: mongoose.Model<any> = mongoose.model("User", UserSchema);

export async function saveUser(newUser: userModel, callback: any) {

    let encrypted_token = await crypto_utils.encrypt(newUser.github_token);
    newUser.github_token = encrypted_token;

    bcrypt.genSalt(10, (err: Error, salt: string) => {
        if (err) console.error(err);
        bcrypt.hash(newUser.password, salt, (err: Error, hash: string) => {
            if (err) console.error(err);
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
