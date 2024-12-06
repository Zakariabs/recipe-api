const express = require('express');
const path = require('path');
require('./db');

const app = express();
const port = 3000;

app.use(express.json());
// Add to server.js
app.use('/api/categories', require('./routes/category'));
// Basic test route
app.get('/', (req, res) => {
    res.send('Moroccan Recipes API');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});