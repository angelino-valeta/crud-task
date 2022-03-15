const express = require('express');

const mongoose = require('./database/database');

const app = express();

// CORS
app.use(function(req, res, next){

	res.setHeader('Access-Control-Allow-Origin', '*');

	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, PATCH, DELETE');

	res.header('Access-Control-Allow-Headers', 'Content-Type');

	next();
});

// BODY PARSER
app.use(express.json());

app.listen(5000, () => { console.log('Server running on port 5000!')});