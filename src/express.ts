const express = require('express');
import * as bodyParser from 'body-parser';
import { profileRouter } from './routes/ProfileRouter';
import mongoSchema from './database/schema';
import mongoose, { Schema } from 'mongoose';
import uniqueValidator  from 'mongoose-unique-validator';
import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy } from 'passport-local';

const app = express();

dotenv.config();

// Mongo config
const UserSchema = new Schema({ 
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true, }
 });
UserSchema.plugin(uniqueValidator);
  
const DBKey: any = process.env.dbKey; 
mongoose.connect(DBKey, { useNewUrlParser: true });

const User = mongoose.model("User", UserSchema);

// const username = "Daniel"
// const password = "Password!"

app.get('/', async (req: any, res: any) => {
    try {
        const newUser = new User({username: 'Daniel', password: 'password!!'});
        console.log(newUser); 
        await newUser.save();
    } catch (e) {
        console.log(e); 
    }
    res.send("Successfully added user!"); 
});

// // Passport config
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function(user, done) {
//   done(null, user._id);
// });

// passport.deserializeUser(function(userId, done) {
//   User.findById(userId, (err, user) => done(err, user));
// });

// const local = new Strategy((username, password, done) => {
//   User.findOne({ username })
//     .then(user => {
//       if (!user || !user.validPassword(password)) {
//         done(null, false, { message: "Invalid username/password" });
//       } else {
//         done(null, user);
//       }
//     })
//     .catch(e => done(e));
// });
// passport.use("local", local);

// // Routes
// app.use("/", require("./routes")(passport));

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use('/api/profiles', profileRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});