import React from 'react'
import { CopyrightIcon, GitHubIcon } from '../assets/icons'

const GITHUB_LINK = 'https://github.com/iirokiviluoma-projects/event-calendar-fullstack'

const Footer = () => (
  <div className='footer'>
    <div className='footer-item'>
      <CopyrightIcon />
      Iiro Kiviluoma
    </div>

    <div className='footer-item'>
      <a
        href={GITHUB_LINK}
        target='_blank'
        rel='noopener noreferrer'
      >
        <GitHubIcon />
      </a>
    </div>
  </div>
)

export default Footer
