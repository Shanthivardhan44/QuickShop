// db.js
const Database = require('better-sqlite3');
const db = new Database('quickshop.db');

function init() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      barcode TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL DEFAULT 0,
      brand TEXT,
      weight REAL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS bills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      market TEXT,
      total_price REAL,
      total_qty INTEGER,
      total_weight REAL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS bill_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bill_id INTEGER NOT NULL,
      barcode TEXT NOT NULL,
      name TEXT,
      price REAL,
      qty INTEGER,
      FOREIGN KEY (bill_id) REFERENCES bills(id)
    );
  `);
}

module.exports = { db, init };
