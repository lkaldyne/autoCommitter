import mongoose, { Schema } from 'mongoose';
import uniqueValidator  from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';

// User model config
const UserSchema: mongoose.Schema<any>  = new Schema({ 
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true, }
 });

UserSchema.plugin(uniqueValidator);

interface userModel {
    username: string,
    password: string,
    save: () => Promise<any>
};

export const User: mongoose.Model<any> = mongoose.model("User", UserSchema);

export function saveUser(newUser: userModel) {    
    bcrypt.genSalt(10, (err: Error, salt: string) => {
        if (err) console.error(err);
        bcrypt.hash(newUser.password, salt, (err: Error, hash: string) => {
            if (err) console.error(err);
            newUser.password = hash;
            newUser.save()
            .then(() => console.log('Succesfully created user'))
            .catch((err) => {
                throw Error(err)
            });
        });
    });
}
