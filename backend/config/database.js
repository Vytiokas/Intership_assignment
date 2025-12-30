const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    this.db = new sqlite3.Database(path.join(__dirname, '../data/games.db'));
    this.init();
  }

  init() {
    this.db.serialize(() => {
      // Create games table
      this.db.run(`CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        platform TEXT,
        region TEXT,
        price REAL,
        original_price REAL,
        discount INTEGER,
        image_url TEXT,
        cashback BOOLEAN DEFAULT 0,
        rating REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      // Check if table is empty and populate with sample data
      this.db.get('SELECT COUNT(*) as count FROM games', (err, row) => {
        if (err) {
          console.error('Error checking games table:', err);
          return;
        }
        
        if (row.count === 0) {
          console.log('📦 Populating database with sample games...');
          this.populateSampleData();
        }
      });
    });
  }

  populateSampleData() {
    const games = [
      {
        name: 'Split Fiction EA App Key (PC) GLOBAL',
        platform: 'PC',
        region: 'GLOBAL',
        price: 40.93,
        original_price: 44.99,
        discount: 9,
        image_url: '',
        cashback: 1,
        rating: 4.5
      },
      {
        name: 'Split Fiction (Xbox Series X|S) XBOX LIVE Key EUROPE',
        platform: 'XBOX',
        region: 'EUROPE',
        price: 34.14,
        original_price: 39.99,
        discount: 15,
        image_url: '',
        cashback: 1,
        rating: 4.3
      },
      {
        name: 'Split Fiction (Xbox Series X|S) XBOX LIVE Key GLOBAL',
        platform: 'XBOX',
        region: 'GLOBAL',
        price: 35.15,
        original_price: 39.99,
        discount: 12,
        image_url: '',
        cashback: 1,
        rating: 4.4
      },
      {
        name: 'Split Fiction (Nintendo Switch) eShop Key EUROPE',
        platform: 'Nintendo Switch',
        region: 'EUROPE',
        price: 36.25,
        original_price: 42.99,
        discount: 16,
        image_url: '',
        cashback: 1,
        rating: 4.2
      },
      {
        name: 'FIFA 23 Standard Edition (PC) Origin Key GLOBAL',
        platform: 'PC',
        region: 'GLOBAL',
        price: 29.99,
        original_price: 59.99,
        discount: 50,
        image_url: '',
        cashback: 1,
        rating: 4.1
      },
      {
        name: 'FIFA 23 (PlayStation 5) PSN Key EUROPE',
        platform: 'PlayStation 5',
        region: 'EUROPE',
        price: 34.99,
        original_price: 69.99,
        discount: 50,
        image_url: '',
        cashback: 1,
        rating: 4.0
      },
      {
        name: 'FIFA 23 Ultimate Edition (Xbox Series X|S) GLOBAL',
        platform: 'XBOX',
        region: 'GLOBAL',
        price: 44.99,
        original_price: 89.99,
        discount: 50,
        image_url: '',
        cashback: 1,
        rating: 4.2
      },
      {
        name: 'Red Dead Redemption 2 (PC) Rockstar Key GLOBAL',
        platform: 'PC',
        region: 'GLOBAL',
        price: 24.99,
        original_price: 59.99,
        discount: 58,
        image_url: '',
        cashback: 1,
        rating: 4.8
      },
      {
        name: 'Red Dead Redemption 2 Ultimate Edition (PC) Steam Key GLOBAL',
        platform: 'PC',
        region: 'GLOBAL',
        price: 39.99,
        original_price: 99.99,
        discount: 60,
        image_url: '',
        cashback: 1,
        rating: 4.9
      },
      {
        name: 'Red Dead Redemption 2 (PlayStation 4) PSN Key EUROPE',
        platform: 'PlayStation 4',
        region: 'EUROPE',
        price: 19.99,
        original_price: 49.99,
        discount: 60,
        image_url: '',
        cashback: 1,
        rating: 4.7
      }
    ];

    const stmt = this.db.prepare(`INSERT INTO games (name, platform, region, price, original_price, discount, image_url, cashback, rating) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    
    games.forEach(game => {
      stmt.run(game.name, game.platform, game.region, game.price, game.original_price, 
               game.discount, game.image_url, game.cashback, game.rating);
    });
    
    stmt.finalize();
    console.log('✅ Sample games added to database');
  }

  getDb() {
    return this.db;
  }
}

module.exports = new Database();