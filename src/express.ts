
const express = require('express');
import * as bodyParser from 'body-parser';
import { profileRouter } from './routes/ProfileRouter';

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use('/api/profiles', profileRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});