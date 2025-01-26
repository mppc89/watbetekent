import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { Suspense } from "react";
import fetchWord from "./components/FetchWord";
import Script from "next/script"; // Import Script van next/script

const words = await fetchWord();

export const metadata = {
  metadataBase: new URL("https://www.watbetekent.be"),
  title: {
    default: "WatBetekent.be - Wat betekent een specifiek woord?",
    template: "%s | WatBetekent.be",
  },
  description: "Ontdek de betekenis van woorden en afkortingen.",
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: "https://www.watbetekent.be",
    siteName: "WatBetekent",
  },
  twitter: {
    card: "summary",
    title: "WatBetekent - Vind de betekenis",
    description: "Zoek naar betekenissen van woorden en afkortingen.",
  },
  keywords: [
    "betekenis woorden",
    "betekenis afkortingen",
    "woordenboek",
    "online woordenboek",
    "wat betekent",
    "definities woorden",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Schema.org structured data
const schema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "WatBetekent",
  url: "https://www.watbetekent.be",
  description:
    "Ontdek de betekenis van woorden, afkortingen en termen met betrouwbare definities op WatBetekent.be.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.watbetekent.be/zoeken?query={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang='nl'>
      <head>
        <Script
          id='google-tag-manager'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': 
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], 
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); 
            })(window,document,'script','dataLayer','GTM-KGPB3DM2');`,
          }}
        />
        <meta name='google-adsense-account' content='ca-pub-3874845320571572' />
      </head>
      <body className='bg-gray-50 text-gray-800'>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-KGPB3DM2'
            height='0'
            width='0'
            style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />

        <main className='min-h-screen'>
          <div className='container mx-auto px-4 py-8'>
            {/* Main Content and Sidebar Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
              {/* Main Content Area */}
              <div className='lg:col-span-3'>
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </div>

              {/* Sidebar */}
              <aside className='lg:col-span-1'>
                <Suspense fallback={<div>Loading...</div>}>
                  <Sidebar />
                </Suspense>
              </aside>
            </div>
          </div>
        </main>

        <Footer words={words} />

        {/* Schema.org structured data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
