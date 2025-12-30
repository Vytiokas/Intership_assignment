const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const db = new sqlite3.Database(path.join(__dirname, '../data/games.db'));

console.log('🔄 Resetting database...');

db.serialize(() => {
  // Drop existing table
  db.run('DROP TABLE IF EXISTS games');
  
  // Create games table
  db.run(`CREATE TABLE games (
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

  // Insert sample games with empty image_url (will be handled by API)
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

  const stmt = db.prepare(`INSERT INTO games (name, platform, region, price, original_price, discount, image_url, cashback, rating) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  
  games.forEach(game => {
    stmt.run(game.name, game.platform, game.region, game.price, game.original_price, 
             game.discount, game.image_url, game.cashback, game.rating);
  });
  
  stmt.finalize();
  
  console.log('✅ Database reset complete with updated games!');
  console.log('🖼️  Game images will be served from RAWG API');
  
  db.close();
});