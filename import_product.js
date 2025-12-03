// import_products.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { db, init } = require('./db');

init();

const csvPath = '/mnt/data/products.csv'; // <--- your uploaded file path
if (!fs.existsSync(csvPath)) {
  console.error('CSV not found at', csvPath);
  process.exit(1);
}

const insert = db.prepare(`
  INSERT OR REPLACE INTO products (barcode, name, price, brand, weight)
  VALUES (@barcode, @name, @price, @brand, @weight)
`);

let count = 0;
fs.createReadStream(csvPath)
  .pipe(csv())
  .on('data', (row) => {
    // map CSV header names to DB columns; adjust if your CSV uses different headers
    const record = {
      barcode: (row.barcode || row.Barcode || row.code || '').toString().trim(),
      name: row.name || row.Name || row.product || '',
      price: parseFloat(row.price || row.Price || 0) || 0,
      brand: row.brand || row.Brand || '',
      weight: parseFloat(row.weight || row.Weight || 0) || 0
    };
    if (record.barcode) {
      insert.run(record);
      count++;
    }
  })
  .on('end', () => {
    console.log(`Imported ${count} products into DB.`);
    process.exit(0);
  })
  .on('error', (err) => {
    console.error('CSV read error', err);
    process.exit(1);
  });
