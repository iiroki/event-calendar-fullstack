import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import eventDateFormat from '../utils/eventDateFormat'

const EventListItem = ({ e }) => {
  const history = useHistory()

  const handleEventSelect = () => {
    history.push(`/events/${e.id}`)
  }

  return (
    <div
      className='event-list-item'
      role='button'
      onClick={handleEventSelect}
      tabIndex={0}
      onKeyPress={handleEventSelect}
      style={{
        backgroundColor: `#${e.bgColor}`
      }}
    >
      <div
        className='event-list-item-box'
        style={{ color: `#${e.fgColor}` }}
      >
        <div className='event-list-item-title'>
          {`${e.title}`}
        </div>
        <div className='event-list-item-date'>
          {eventDateFormat(e.start, e.end)}
        </div>
      </div>
    </div>
  )
}

const UserDropdownItem = ({ u }) => (
  <span className='dropdown-item user-dropdown-item'>
    {u.name}
  </span>
)

const EventList = () => {
  const [search, setSearch] = useState('') // Search by event name
  const [userFilter, setUserFilter] = useState('Etsi käyttäjää') // Filter events by user

  const users = useSelector(state => state.users)
  const events = useSelector(state => state.events)

  return (
    <div className='event-list'>
      <input
        type='text'
        className='form-control'
        id='searchInput'
        value={search}
        onChange={({ target }) => setSearch(target.value)}
        placeholder='Etsi tapahtuman nimellä'
      />

      <div className='user-dropdown'>
        <button className='btn dropdown-toggle btn-treekkari' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          {userFilter}
        </button>
        <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
          <span className='dropdown-item user-dropdown-item'>
            Ei valittu
          </span>
          <hr style={{ margin: '2px 10px' }} />
          {
            users.map(u => <UserDropdownItem key={u.id} u={u} />)
          }
        </div>
      </div>

      {
        events.map(e => <EventListItem key={e.id} e={e} />)
      }
    </div>
  )
}

export default EventList
