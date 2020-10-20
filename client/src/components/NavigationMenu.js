import React from 'react'
import { Link } from 'react-router-dom'
import {
  Icon,
  CalendarIcon,
  CompassIcon,
  ManageIcon,
  AboutIcon
} from '../assets/icons'

const NavigationMenu = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-md navbar-dark nav-shape'>

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
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbar'>

          <span>
            <hr/>
          </span>

          <span
            className='nav-item nav-item-first'
            data-toggle='collapse'
            data-target='.navbar-collapse.show'
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
