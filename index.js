const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();


//routes
const authRoute  = require('./routes/auth');
const privateRoutes = require('./routes/privateRoutes');
//database
dotenv.config();
mongoose.connect(
    process.env.DB_CONNECT,
    () => console.log("Database is connected."));
//middleware
app.use(bodyParser.json());
//route to middleware
app.use('/api', authRoute);
app.use('/api/users', privateRoutes);
//start server
app.listen(3000, () => console.log("Server is running"));