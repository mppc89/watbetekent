import { incrementWordSearch, checkWordThreshold } from "../../database-utils";
const path = require("path");
const fs = require("fs");

// Gebruik het juiste pad naar 'words.json'
const jsonPath = path.join(process.cwd(), "src/app/woorden/data/words.json");
const backupPath = path.join(
  process.cwd(),
  "src/app/woorden/data/words_backup.json"
);

// Controleer of het bestand bestaat, anders maak je het aan
if (!fs.existsSync(jsonPath)) {
  fs.writeFileSync(jsonPath, JSON.stringify([], null, 2));
  console.log("Words.json bestand aangemaakt.");
}

// Maak een backup voordat je het bestand bijwerkt
if (fs.existsSync(jsonPath)) {
  fs.copyFileSync(jsonPath, backupPath);
  console.log("Backup gemaakt:", backupPath);
}

// Haal definitie op via ChatGPT
async function fetchChatGPTDefinition(word) {
  const excludedKeywords = [
    "geen bekend woord",
    "niet zeker",
    "typfout",
    "meer informatie",
    "beter kan helpen",
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
              Je bent een woordenboek. Geef een duidelijke en betrouwbare definitie van het woord dat de gebruiker invoert.
              Als je niet zeker bent van de betekenis van het woord, geef dan geen antwoord of zeg expliciet "Ik weet het niet zeker.".
              `,
          },
          { role: "user", content: `Wat betekent: ${word}?` },
        ],
      }),
    });

    const data = await response.json();
    const definition =
      data.choices[0]?.message?.content?.trim() || "Geen definitie gevonden.";

    // Controleer op uitsluitingswoorden
    if (
      excludedKeywords.some((keyword) =>
        definition.toLowerCase().includes(keyword)
      )
    ) {
      console.log(`Generiek antwoord ontvangen: ${definition}`);
      return "Geen definitie gevonden.";
    }

    return definition;
  } catch (error) {
    console.error("Error fetching definition from ChatGPT:", error.message);
    return "Geen definitie gevonden.";
  }
}

// Voeg een nieuw woord toe aan de JSON
function addWordToJson(word, definition) {
  // Maak een backup van de bestaande JSON
  if (fs.existsSync(jsonPath)) {
    fs.copyFileSync(jsonPath, backupPath);
    console.log("Backup gemaakt:", backupPath);
  }

  // Lees de bestaande JSON-data
  const wordsData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

  // Controleer of het woord al bestaat
  if (!wordsData.some((w) => w.title === word)) {
    const newWord = {
      title: word,
      slug: word.toLowerCase().replace(/\s+/g, "-"),
      category: "Populair",
      veryShortDescription: definition.split(".")[0] || "",
      shortDescription: definition.split(".").slice(1, 2).join(".") || "",
      metaTitle: `Wat betekent ${word}`,
      metaDescription: `Leer meer over de betekenis van ${word}.`,
      description: definition,
    };

    // Schrijf het nieuwe woord naar de JSON
    wordsData.push(newWord);
    fs.writeFileSync(jsonPath, JSON.stringify(wordsData, null, 2));
    console.log(`Woord '${word}' toegevoegd aan JSON.`);
  }
}

// API-handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only POST requests are allowed." });
    return;
  }

  const { word, userId } = req.body;

  if (!word || !userId) {
    res.status(400).json({ error: "Woord en userId zijn verplicht." });
    return;
  }

  try {
    // Registreer de zoekopdracht
    await incrementWordSearch(word, userId);

    // Controleer of het woord 3 keer door unieke gebruikers is gezocht
    const isThresholdReached = await checkWordThreshold(word, 3);

    // Haal definitie op van ChatGPT
    const definition = await fetchChatGPTDefinition(word);

    // Voeg het woord alleen toe aan de JSON als de drempel is bereikt en de definitie geldig is
    if (isThresholdReached && definition !== "Geen definitie gevonden.") {
      addWordToJson(word, definition);
    }

    // Stuur de definitie terug naar de frontend
    res.status(200).json({ definition });
  } catch (error) {
    console.error("Error processing request:", error.message);
    res.status(500).json({ error: "Er is iets misgegaan." });
  }
}
