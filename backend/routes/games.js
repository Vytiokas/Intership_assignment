const express = require('express');
const router = express.Router();
const database = require('../config/database');
const gameImageService = require('../services/gameImageService');

const db = database.getDb();

// GET /api/list - Get all games or search games
router.get('/list', async (req, res) => {
  const search = req.query.search || '';
  
  let query = 'SELECT * FROM games';
  let params = [];
  
  if (search) {
    // Fuzzy search - case insensitive, partial matches
    query += ' WHERE LOWER(name) LIKE LOWER(?)';
    params.push(`%${search}%`);
  }
  
  query += ' ORDER BY name ASC';
  
  // Promisify database query
  const getGames = () => {
    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  };

  try {
    const rows = await getGames();
    
    // Add proper image URLs for each game using Giant Bomb API
    const gamesWithImages = await Promise.all(rows.map(async (game) => {
      let imageUrl = await gameImageService.searchGame(game.name);
      
      // Jei Giant Bomb API nepavyko, naudojame fallback
      if (!imageUrl) {
        imageUrl = gameImageService.getFallbackImage(game.name);
      }
      
      return {
        ...game,
        image_url: imageUrl
      };
    }));
    
    res.json({
      games: gamesWithImages,
      total: gamesWithImages.length,
      search: search
    });
    
  } catch (error) {
    console.error('Database or API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// GET /api/games/:id - Get specific game by ID
router.get('/games/:id', async (req, res) => {
  const gameId = req.params.id;
  
  // Promisify database query
  const getGame = () => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM games WHERE id = ?', [gameId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  };

  try {
    const row = await getGame();
    
    if (!row) {
      res.status(404).json({ 
        error: 'Game not found',
        message: `No game found with ID ${gameId}` 
      });
      return;
    }
    
    // Get image using Giant Bomb API
    let imageUrl = await gameImageService.searchGame(row.name);
    
    if (!imageUrl) {
      imageUrl = gameImageService.getFallbackImage(row.name);
    }
    
    const gameWithImage = {
      ...row,
      image_url: imageUrl
    };
    
    res.json(gameWithImage);
    
  } catch (error) {
    console.error('Database or API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

module.exports = router;