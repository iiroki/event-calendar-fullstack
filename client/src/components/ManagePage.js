import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logOut } from '../reducers/loginReducer'
import { setNotification, notificationTypes } from '../reducers/notificationReducer'

import ManageProfile from './ManageProfile'
import EventForm from './EventForm'
import ManageEventsList from './ManageEventsList'

const ManagePage = () => {
  const loggedUser = useSelector(state => state.login)
  const dispatch = useDispatch()

  // If there's no active login at the moment
  if (!loggedUser) {
    return (
      <Redirect to={'/login'} />
    )
  }

  // Event handler for log out -button
  const handleLogout = event => {
    event.preventDefault()
    dispatch(logOut())
    
    dispatch(setNotification(
      'Kirjauduttu ulos.',
      notificationTypes.GOOD
    ))
  }

  return (
    <div>
      <h2>Terve {loggedUser.name}!</h2>

      <button
        className='btn btn-danger'
        type='button'
        onClick={handleLogout}
      >
        Kirjaudu ulos
      </button>

      <div className='collapsible-wrapper'>
        <a
          className='btn btn-light collapsible-menu-button'
          data-toggle='collapse'
          href='#profileCollapsible'
          aria-expanded='false'
          aria-controls='profileCollapsible'
        >
          Profiili
        </a>
        <div className='collapse collapsible' id='profileCollapsible'>
          <ManageProfile />
        </div>
      </div>

      <div className='collapsible-wrapper'>
        <a
          className='btn btn-light collapsible-menu-button'
          data-toggle='collapse'
          href='#addEventCollapsible'
          aria-expanded='false'
          aria-controls='addEventCollapsible'
        >
          Lisää tapahtuma
        </a>
        <div className='collapse collapsible' id='addEventCollapsible'>
          <EventForm />
        </div>
      </div>
      
      <div className='collapsible-wrapper'>
        <a
          className='btn btn-light collapsible-menu-button'
          data-toggle='collapse'
          href='#userEventsCollapsible'
          aria-expanded='false'
          aria-controls='userEventsCollapsible'
        >
          Tapahtumasi
        </a>
        <div className='collapse collapsible' id='userEventsCollapsible'>
          <ManageEventsList />
        </div>  
      </div>
          
    </div>
  )
}

export default ManagePage
