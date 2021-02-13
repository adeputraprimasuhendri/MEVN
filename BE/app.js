const express = require('express');
const app = express();
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const cors = require('cors');

//IMPORT ROUTES
const AuthRoute  = require('./routes/auth');
require('dotenv').config();

//MIDDLEWARE
app.use(cors());
app.use(BodyParser.json());
app.use('/api/auth', AuthRoute);

//ROUTE
app.get('/', (req, res) => {
    res.send('Server running on '+process.env.HOST+':'+process.env.PORT+'...');
});

//CONNECT TO MONGGODB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Database Connected');
});

app.listen(process.env.PORT, process.env.HOST);