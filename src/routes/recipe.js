// Search recipes by title
router.get('/search', (req, res) => {
    const searchTerm = `%${req.query.title || ''}%`;
    
    db.all(`
      SELECT r.*, c.name as category_name 
      FROM recipes r
      JOIN categories c ON r.category_id = c.id
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
    db.get(`
      SELECT r.*, c.name as category_name 
      FROM recipes r
      JOIN categories c ON r.category_id = c.id
      WHERE r.id = ?`, 
      [req.params.id], 
      (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Recipe not found' });
        row.ingredients = JSON.parse(row.ingredients);
        res.json(row);
      }
    );
  });
  
  // Update recipe
  router.put('/:id', validateRecipe, (req, res) => {
    const { title, ingredients, instructions, cooking_time, category_id } = req.body;
    
    db.run(`
      UPDATE recipes 
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