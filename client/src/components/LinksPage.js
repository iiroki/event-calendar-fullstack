import React from 'react'
import { GitHubIcon, LinkedInIcon } from '../assets/icons'

const LinksPage = () => (
  <div className='about-box'>
    <h4>
      <b>
        Linkkejä
      </b>
    </h4>

    <h5>
      Kalenteri:
    </h5>
    <a
      href='https://github.com/iirokiviluoma-projects/event-calendar-fullstack'
      target='_blank'
      rel='noopener noreferrer'
    >
      <GitHubIcon />
      Lähdekoodi (GitHub)
    </a>

    <h5 style={{ marginTop: '10px' }}>
      Iiro Kiviluoma:
    </h5>
    <div>
      <a
        href='https://www.linkedin.com/in/iiroki/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <LinkedInIcon />
        LinkedIn
      </a>
    </div>
    <div>
      <a
        href='https://github.com/iirokiviluoma-projects'
        target='_blank'
        rel='noopener noreferrer'
      >
        <GitHubIcon />
        GitHub-portfolio
      </a>
    </div>
  </div>
)

export default LinksPage
