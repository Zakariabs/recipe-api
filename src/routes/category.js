// src/routes/category.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { validateCategory } = require('../middleware/validate');

// Get all categories
router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  
  db.all('SELECT * FROM categories LIMIT ? OFFSET ?', [limit, offset], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Create category
router.post('/', validateCategory, (req, res) => {
  const { name, description } = req.body;
  
  db.run('INSERT INTO categories (name, description) VALUES (?, ?)',
    [name, description],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

module.exports = router;