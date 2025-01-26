import words from "../../../app/woorden/data/words.json";

export default function handler(req, res) {
  const { slug } = req.query; // Haal de slug uit de URL
  const word = words.find((w) => w.slug === slug); // Zoek het woord met de juiste slug

  if (!word) {
    return res.status(404).json({ error: "Woord niet gevonden" });
  }

  res.status(200).json(word); // Retourneer het gevonden woord
}
