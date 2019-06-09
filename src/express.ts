import express from 'express';
import * as bodyParser from 'body-parser';
import { profileRouter } from './routes/ProfileRouter';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';

const app = express();
dotenv.config();

// Mongo config
const DBKey: any = process.env.dbKey; 
mongoose.connect(DBKey, { useNewUrlParser: true })
 .then(() => console.log("Succesfully connected to MongoDB."))
 .catch((err) => console.error(err));

// Fix mongo deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

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

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use('/api/profiles', profileRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});