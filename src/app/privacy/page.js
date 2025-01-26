export default function PrivacyPage() {
  return (
    <main id='main' className='space-y-8'>
      <section className='text-center py-12'>
        <h1 className='text-4xl font-bold mb-4'>Privacybeleid</h1>
        <p className='text-xl text-gray-600 mb-8'>
          Uw privacy is onze prioriteit. Ontdek hoe wij uw gegevens beschermen
          en transparant beheren.{" "}
        </p>
      </section>

      {/* Privacy Policy Content */}
      <section className='bg-white rounded-xl p-6 shadow-sm'>
        <div>
          {/* Sections */}
          <div>
            <div className='mb-8'>
              <h2 className='text-2xl font-bold mb-6'>
                Categorieën gegevensverzameling
              </h2>
              <p className='text-gray-700 leading-relaxed'>
                Wij verzamelen alleen gegevens die noodzakelijk zijn voor de
                functionaliteit van onze website en om u een optimale
                gebruikerservaring te bieden. Dit omvat:
              </p>
              <ul className='list-disc pl-6 space-y-2 text-gray-700 mt-4'>
                <li>
                  Uw naam en e-mailadres bij het invullen van een
                  contactformulier.
                </li>
                <li>
                  Uw IP-adres voor beveiligings- en analytische doeleinden.
                </li>
                <li className='mb-8'>
                  Eventuele informatie die u vrijwillig verstrekt via onze
                  formulieren.
                </li>
              </ul>
            </div>

            <div className='mb-8'>
              {" "}
              <h2 className='text-2xl font-bold mb-6'>Gebruik van gegevens</h2>
              <p className='text-gray-700 leading-relaxed'>
                De gegevens die wij verzamelen worden uitsluitend gebruikt voor
                de volgende doeleinden:
              </p>
              <ul className='list-disc pl-6 space-y-2 text-gray-700 mt-4'>
                <li>Het verbeteren van onze website en diensten.</li>
                <li>
                  Het verwerken van vragen of verzoeken via het
                  contactformulier.
                </li>
                <li>Het waarborgen van de veiligheid van onze gebruikers.</li>
              </ul>
            </div>

            <div className='mb-8'>
              {" "}
              <h2 className='text-2xl font-bold mb-6'>Cookies</h2>
              <p className='text-gray-700 leading-relaxed'>
                Onze website maakt gebruik van minimale cookies voor essentiële
                functionaliteiten. Deze cookies verzamelen geen persoonlijke
                gegevens, tenzij u hiervoor expliciet toestemming geeft.
              </p>
              <p className='text-gray-700 mt-4'>
                U kunt uw browserinstellingen aanpassen om cookies te weigeren,
                maar dit kan invloed hebben op de functionaliteit van de
                website.
              </p>
            </div>

            <div className='mb-8'>
              {" "}
              <h2 className='text-2xl font-bold mb-6'>Uw rechten</h2>
              <p className='text-gray-700 leading-relaxed'>
                U heeft verschillende rechten met betrekking tot uw persoonlijke
                gegevens:
              </p>
              <ul className='list-disc pl-6 space-y-2 text-gray-700 mt-4'>
                <li>Recht op inzage in uw persoonlijke gegevens.</li>
                <li>Recht op correctie van foutieve gegevens.</li>
                <li>
                  Recht op verwijdering van uw gegevens, tenzij dit in strijd is
                  met wettelijke verplichtingen.
                </li>
              </ul>
              <p className='text-gray-700 mt-4'>
                Voor verzoeken of vragen over uw gegevens kunt u contact met ons
                opnemen via ons{" "}
                <a
                  href='/contact'
                  className='text-blue-600 font-medium hover:underline'>
                  contactformulier
                </a>
                .
              </p>
            </div>

            <div className='mb-8'>
              {" "}
              <h2 className='text-2xl font-bold mb-6'>Beveiliging</h2>
              <p className='text-gray-700 leading-relaxed'>
                Wij nemen de beveiliging van uw gegevens serieus en
                implementeren passende technische en organisatorische
                maatregelen om uw gegevens te beschermen tegen ongeoorloofde
                toegang.
              </p>
            </div>

            <div>
              {" "}
              <h2 className='text-2xl font-bold mb-6'>
                Wijzigingen in dit beleid
              </h2>
              <p className='text-gray-700 leading-relaxed'>
                Dit privacybeleid kan van tijd tot tijd worden gewijzigd. Wij
                raden u aan om deze pagina regelmatig te raadplegen om op de
                hoogte te blijven van eventuele updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
