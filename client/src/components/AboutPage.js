import React from 'react'

const AboutPage = () => (
  <div className='about-box'>
    <h4>
      <b>
        Yleistä kalenterista
      </b>
    </h4>
    <p>
      Teekkarikalenteri on PerinneSeuran toimittama ja Tampereen
      Teekkarien julkaisema tamperelainen teekkarikalenteri.
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
      <span className='subscribe-link'>
        <i>
          https://teekkarikalenteri.fi/api/subscribe/teekkarikalenteri.ics 
        </i>
      </span>
    </p>
  </div>
)

export default AboutPage
