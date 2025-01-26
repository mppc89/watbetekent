const db = require("./database");

// Verhoog de zoekfrequentie voor een woord door een zoekopdracht te registreren
function incrementWordSearch(word, userId) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO searches (word, user_id) VALUES (?, ?)`,
      [word, userId],
      (err) => {
        if (err) {
          console.error("Error updating word search count:", err.message);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

// Controleer of een woord door minstens X unieke gebruikers is gezocht
function checkWordThreshold(word, threshold) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT COUNT(DISTINCT user_id) AS unique_users FROM searches WHERE word = ?`,
      [word],
      (err, row) => {
        if (err) {
          console.error("Error checking word threshold:", err.message);
          reject(err);
        } else {
          resolve(row.unique_users >= threshold); // True als drempel is bereikt
        }
      }
    );
  });
}

module.exports = { incrementWordSearch, checkWordThreshold };
