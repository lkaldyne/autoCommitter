import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoStore from 'connect-mongo';
import path from "path";
import { gitRouter } from './routes/GitRouter';
import { configurePassport } from './utils/passport';
import { profileRouter } from './routes/ProfileRouter';

const express = require('express');

import passport = require('passport');

export const commitFile: string = 'README.md';
export const repoPath: string = path.join('.', 'commitsRepo');
export const repoUrl: string = 'github.com/lkaldyne/commitsRepo.git';

const MongoStore = mongoStore(session);

const app = express();
dotenv.config();


app.use((req: Request, res: Response, next: any) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Mongo config
const DBKey: any = process.env.dbKey;
mongoose.connect(DBKey, { useNewUrlParser: true })
  .then(() => console.log('Succesfully connected to MongoDB.'))
  .catch((err: mongoose.Error) => console.error(err));

mongoose.Promise = global.Promise;
const db: any = mongoose.connection;

// Fix mongo deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Configure express session
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: db }),
}));

// Passport config
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// General config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/profiles', profileRouter);
app.use('/api/git', gitRouter)

app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
