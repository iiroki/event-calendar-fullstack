import React from 'react'

const HELP_EMAIL = 'tuki@teekkarikalenteri.fi'
const FEEDBACK_FORMS = 'www.jaynakisa.fi'

const AboutPage = () => (
  <div className='about-box'>
    <h4>
      <b>
        Yleistä kalenterista
      </b>
    </h4>
    <p>
      Teekkarikalenteri on Tampereen teekkarien PerinneSeuran toimittama ja
      Tampereen Teekkarien julkaisema tamperelainen teekkarikalenteri, joka
      pyrkii tuomaan kaikki Tampereen teekkaritapahtumat yhteen paikkaan.
      Teekkarikalenteri-käyttäjätili myönnetään kaikille Tampereen Teekkarien
      jäsenille, jotka ovat siihen oikeutettuja. Käyttäjätilin avulla on
      mahdollista lisätä, muokata ja poistaa omia tapahtumia. Myös
      käyttäjätiliin sidottua ulkopuolisille näkyvää profiilia on mahdollisuus
      muokata nimen, linkin ja teemavärien muodossa.
    </p>

    <h4>
      <b>
        Kalenterin tilaaminen toiseen kalenteriin
      </b>
    </h4>
    <p>
      Teekkarikalenterin voi tilata toiseen kalenteriin alla olevalla
      URL-osoitteella:
      <br />
      <span className='about-link subscribe-link'>
        <i>
          https://teekkarikalenteri.fi/api/subscribe/teekkarikalenteri.ics
        </i>
      </span>
    </p>

    <h4>
      <b>
        Kalenterin käyttäminen mobiilisovelluksena
      </b>
    </h4>
    <p>
      Teekkarikalenteria voi käyttää myös PWA-mobiilisovelluksen muodossa. Avaa
      mobiiliselaimen valikko osoitapalkista ja paina &quot;Lisää aloitusnäyttöön&quot;
      (Chrome/Safari) tai &quot;Asenna&quot; (Firefox).
    </p>

    <h4>
      <b>
        Tuki ja palaute
      </b>
    </h4>
    <p>
      Mikäli tarvitset Teekkarikalenteriin liittyen, esimerkiksi unohtuneen salasanan tai
      uuden käyttäjätilin toimesta, voit ottaa yhteyttä seuraavaan sähköpostiin:
      <br />
      <a
        className='about-link'
        href={`mailto:${HELP_EMAIL}`}
      >
        {HELP_EMAIL}
      </a>
    </p>
    <p>
      Löysitkö Teekkarikalenterista bugin? Onko sinulla kehitysehdotuksia? Voit
      ilmoittaa niistä seuraavaan
      {' '}
      <a
        href={`//${FEEDBACK_FORMS}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        Google Formsiin
      </a>
      .
    </p>
  </div>
)

export default AboutPage
