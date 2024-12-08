// src/routes/recipe.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { validateRecipe } = require('../middleware/validate');

// Get all recipes with pagination
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    
    db.all(`SELECT r.*, c.name as category_name 
            FROM recipes r
            LEFT JOIN categories c ON r.category_id = c.id
            LIMIT ? OFFSET ?`, 
        [limit, offset], 
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
});

// Search recipes by title
router.get('/search', (req, res) => {
    const searchTerm = `%${req.query.title || ''}%`;
    
    db.all(`SELECT r.*, c.name as category_name 
            FROM recipes r
            LEFT JOIN categories c ON r.category_id = c.id
            WHERE r.title LIKE ?`, 
        [searchTerm], 
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    );
});

// Get single recipe
router.get('/:id', (req, res) => {
    db.get(`SELECT r.*, c.name as category_name 
            FROM recipes r
            LEFT JOIN categories c ON r.category_id = c.id
            WHERE r.id = ?`, 
        [req.params.id], 
        (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(404).json({ error: 'Recipe not found' });
            try {
                row.ingredients = JSON.parse(row.ingredients);
            } catch (e) {
                console.error('Error parsing ingredients:', e);
            }
            res.json(row);
        }
    );
});

// Create recipe
router.post('/', validateRecipe, (req, res) => {
    const { title, ingredients, instructions, cooking_time, category_id } = req.body;
    
    db.run(`INSERT INTO recipes (title, ingredients, instructions, cooking_time, category_id) 
            VALUES (?, ?, ?, ?, ?)`,
        [title, JSON.stringify(ingredients), instructions, cooking_time, category_id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );
});

// Update recipe
router.put('/:id', validateRecipe, (req, res) => {
    const { title, ingredients, instructions, cooking_time, category_id } = req.body;
    
    db.run(`UPDATE recipes 
            SET title = ?, ingredients = ?, instructions = ?, cooking_time = ?, category_id = ?
            WHERE id = ?`,
        [title, JSON.stringify(ingredients), instructions, cooking_time, category_id, req.params.id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Recipe not found' });
            res.json({ message: 'Recipe updated' });
        }
    );
});

// Delete recipe
router.delete('/:id', (req, res) => {
    db.run('DELETE FROM recipes WHERE id = ?',
        [req.params.id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Recipe not found' });
            res.json({ message: 'Recipe deleted' });
        }
    );
});

module.exports = router;