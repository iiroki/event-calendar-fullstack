import React from 'react'
import { CopyrightIcon } from '../assets/icons'

const Footer = () => (
  <div className='footer'>
    <div className='footer-item'>
      <CopyrightIcon />
      Teekkarikalenteri.fi
    </div>

    <div className='footer-item' style={{ color: '#999999' }}>
      <i>
        Sivuston toteutus: Iiro Kiviluoma
      </i>
    </div>
  </div>
)

export default Footer
