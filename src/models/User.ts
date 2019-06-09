import mongoose, { Schema } from 'mongoose';
import uniqueValidator  from 'mongoose-unique-validator';

// User model config
const UserSchema: mongoose.Schema<any>  = new Schema({ 
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true, }
 });
UserSchema.plugin(uniqueValidator);
const User: mongoose.Model<any> = mongoose.model("User", UserSchema);

export default User; 