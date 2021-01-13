import React from 'react'

const AboutPage = () => (
  <div className='about-box'>
    <h4>
      <b>
        Yleistä kalenterista
      </b>
    </h4>
    <p>
      Kalenterin frontend on toteutettu Reactin ja Reduxin avulla ja
      backendin päätyökaluina puolestaan toimi Node.js ja Express.
      Kalenterin tietovarastona toimii MySQL-tietokanta.
    </p>
    <p>
      Kalenterin avulla sisäänkirjautuneet käyttäjät kykenevät luomaan,
      muokkaamaan ja poistamaan tapahtumia. Käyttäjät voivat myös muokata
      profiiliaan, eli tapahtumiensa väriä sekä profiilin linkkiä.
      Tapahtumia on mahdollisuus tarkastella niin kalenteri- kuin listanäkymässä,
      josta löytyy lisäominaisuutena hakutoiminnallisuus. Yksittäistä tapahtumaa
      klikkaamalla pääsee kyseisen tapahtuman omalle tapahtumasivulle.
    </p>
  </div>
)

export default AboutPage
