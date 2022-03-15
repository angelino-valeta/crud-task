const express = require('express');

const mongoose = require('./database/database');

const app = express();

app.listen(5000, () => { console.log('Server running on port 5000!')});