import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: "Alle velden zijn verplicht." });
      return;
    }

    try {
      // Maak een Nodemailer transport aan
      const transporter = nodemailer.createTransport({
        host: "smtp.example.com", // Vervang met jouw SMTP-server
        port: 587, // Meestal 587 voor TLS
        secure: false, // Gebruik `false` voor TLS
        auth: {
          user: "jouw-email@example.com", // SMTP-gebruikersnaam
          pass: "jouw-wachtwoord", // SMTP-wachtwoord
        },
      });

      // Stel de e-mail in
      const mailOptions = {
        from: `"Contactformulier" <no-reply@watbetekent.be>`, // Afzender
        to: "michael@pay-per-click.be", // Ontvanger
        subject: "Nieuw bericht via contactformulier",
        text: `Je hebt een nieuw bericht ontvangen:\n\nNaam: ${name}\nE-mail: ${email}\nBericht: ${message}`,
        html: `
          <p><strong>Naam:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Bericht:</strong></p>
          <p>${message}</p>
        `,
      };

      // Stuur de e-mail
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Bericht succesvol verzonden." });
    } catch (error) {
      console.error("Fout bij het verzenden van e-mail:", error);
      res
        .status(500)
        .json({ error: "Er is een probleem opgetreden bij het verzenden." });
    }
  } else {
    res.status(405).json({ error: "Method niet toegestaan." });
  }
}
