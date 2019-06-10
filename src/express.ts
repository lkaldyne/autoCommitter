import express from 'express';
import * as bodyParser from 'body-parser';
import { profileRouter } from './routes/ProfileRouter';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport = require('passport');
import { configurePassport } from './utils/passport';
import session from 'express-session'; 

const app = express();
dotenv.config();

// Mongo config
const DBKey: any = process.env.dbKey; 
mongoose.connect(DBKey, { useNewUrlParser: true })
 .then(() => console.log("Succesfully connected to MongoDB."))
 .catch((err: mongoose.Error) => console.error(err));
 
// Fix mongo deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Configure express session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

// Passport config
configurePassport(passport); 
app.use(passport.initialize());
app.use(passport.session()); 

// General config
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use('/api/profiles', profileRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});