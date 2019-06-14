import express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { profileRouter } from './routes/ProfileRouter';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport = require('passport');
import { configurePassport } from './utils/passport';
import session from 'express-session'; 
import cookieParser from 'cookie-parser';
import mongoStore from 'connect-mongo';
import path from "path";

export const commitFile: string =  "README.md";
export const repoPath: string = path.join(".", "commitsRepo");
export const repoUrl: string = "github.com/lkaldyne/commitsRepo.git";

const MongoStore = mongoStore(session); 

const app = express();
dotenv.config();

// Mongo config
const DBKey: any = process.env.dbKey; 
// const localKey: any = process.env.dblocal; 
mongoose.connect(DBKey, { useNewUrlParser: true })
 .then(() => console.log("Succesfully connected to MongoDB."))
 .catch((err: mongoose.Error) => console.error(err));

mongoose.Promise = global.Promise;
const db: any  = mongoose.connection;
 
// Fix mongo deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Configure express session
app.use(cookieParser());
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db })
}));

// Passport config
configurePassport(passport); 
app.use(passport.initialize());
app.use(passport.session()); 

// General config
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use('/api/profiles', profileRouter);

app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});

// Sample usage code for Account

/*let newAccount = new Account({
    username: "",
    email: "",
    ghPersonalKey: "",
    maxNumberOfCommitsPerDay: #,
    commitDaysPerWeek: #
});
newAccount.clone(() => {
    newAccount.alterFile(() => {
        newAccount.stage(() => {
            newAccount.commit(() => {
                console.log("committed");
                newAccount.push(() => {
                    console.log("pushed");
                    newAccount.removeRepo(() => {
                        console.log("removed repo");
                    })
                });
            });
        });
    });    
});*/
