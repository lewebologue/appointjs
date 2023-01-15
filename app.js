const express = require('express');
const path = require('path');

//TODO
//INSERT ROUTE BELOW
//EX: const router = require('./routes/index.js');
//Or each router separately
//EX: const userRouter = require('./routes/user.router);

const app = express();


const InitDB = require('./utils/initdb');

//CORS

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

InitDB().then(() => {
    app.use(express.json());

    //TODO: Primary API url
    //X: app.use('/api/user', userRoutes);
    
    })
    .catch((error) => { console.log("error" + error);
});


module.exports = app;