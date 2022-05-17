import express from "express";
import mongoose from "mongoose";

const app = express();
import {APP_PORT, DB_URL} from './config';

import routes from './routes';
import errorHandler from './middlewares/errorHandler';


// Database Connection
mongoose.connect(DB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true, 
    // useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

db.once('open', ()=>{
    console.log('DB connected....');
})


// Routes
app.use(express.json())
app.use('/api',routes)


// Error Handling middleware
app.use(errorHandler);


// port
app.listen(APP_PORT, () => console.log(`port listing on ${APP_PORT}`));