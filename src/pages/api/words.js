import words from "../../app/woorden/data/words.json";

export default function handler(req, res) {
  const { query } = req.query; // Haal de zoekterm op van de query parameter

  if (query) {
    // Als er een zoekterm is, filter de woorden die de query bevatten
    const filteredWords = words.filter((word) =>
      word.title.toLowerCase().includes(query.toLowerCase())
    );
    return res.status(200).json(filteredWords); // Retourneer gefilterde woorden
  }

  // Als er geen zoekterm is, retourneer alle woorden
  res.status(200).json(words);
}
