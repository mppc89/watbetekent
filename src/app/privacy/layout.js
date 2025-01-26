export const metadata = {
  title: "Contact",
  description:
    "Neem contact op met WatBetekent.be. Heeft u vragen of suggesties? Wij staan voor u klaar.",
  alternates: {
    canonical: "https://www.watbetekent.be/contact",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ContactLayout({ children }) {
  return <>{children}</>; // Geen extra <html> of <body>
}
