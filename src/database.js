const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Maak of open een SQLite-database
const db = new sqlite3.Database(
  path.join(process.cwd(), "database.sqlite"),
  (err) => {
    if (err) {
      console.error("Error opening database:", err.message);
    } else {
      console.log("Connected to SQLite database.");
    }
  }
);

// Maak de benodigde tabellen als ze nog niet bestaan
db.serialize(() => {
  // Tabel voor unieke zoekopdrachten
  db.run(
    `CREATE TABLE IF NOT EXISTS searches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT NOT NULL,
      user_id TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) {
        console.error("Error creating 'searches' table:", err.message);
      } else {
        console.log("Table 'searches' is ready.");
      }
    }
  );
});

module.exports = db;
