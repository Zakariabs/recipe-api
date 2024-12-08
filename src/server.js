const express = require('express');
const path = require('path');
require('./db');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Serve documentation at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Routes
app.use('/api/categories', require('./routes/category'));
app.use('/api/recipes', require('./routes/recipe'));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});