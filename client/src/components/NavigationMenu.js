import React from 'react'
import { Link } from 'react-router-dom'
import {
  Icon,
  CalendarIcon,
  CompassIcon,
  ManageIcon,
  AboutIcon
} from '../assets/icons'

const openTime = 500 // ms

const NavigationMenu = () => {
  // Only toggles animation when navbar is not collapsing
  const toggleOpenAnimation = () => {
    let btn = document.getElementById('navbar-toggle-btn')
    const collapsing = document.getElementById('navbar').classList.contains('collapsing')
    if (!collapsing) btn.classList.toggle('open')
  }

  return (
    <div>
      <nav className='navbar navbar-expand-md navbar-dark'>

        <span className='navbar-brand'>
          <Link className='link' to='/'>
            <Icon />
          </Link>
        </span>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbar'
          aria-controls='navbar'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <div
            className="animated-navbar-toggler-icon"
            id='navbar-toggle-btn'
            onClick={toggleOpenAnimation}
          >
            <span /><span /><span />
          </div>
        </button>

        <div className='collapse navbar-collapse' id='navbar'>

          <span>
            <hr />
          </span>

          <span
            className='nav-item nav-item-first'
            data-toggle='collapse'
            data-target='.navbar-collapse.show'
            onClick={toggleOpenAnimation}
          >
            <Link className='link' to='/'>
              <CalendarIcon />
              Kalenteri
            </Link>
          </span>

          <span
            className='nav-item'
            data-toggle='collapse'
            data-target='.navbar-collapse.show'
            onClick={toggleOpenAnimation}
          >
            <Link className='link' to='/about'>
              <AboutIcon />
              Yleistä
            </Link>
          </span>

          <span
            className='nav-item'
            data-toggle='collapse'
            data-target='.navbar-collapse.show'
            onClick={toggleOpenAnimation}
          >
            <Link className='link' to='/links'>
              <CompassIcon />
              Linkkejä
            </Link>
          </span>

          <span
            className='nav-item ml-auto'
            data-toggle='collapse'
            data-target='.navbar-collapse.show'
            onClick={toggleOpenAnimation}
          >
            <Link className='link' to='/manage'>
              <ManageIcon />
              Hallinta
            </Link>
          </span>

        </div>
      </nav>
    </div>
  )
}

export default NavigationMenu
