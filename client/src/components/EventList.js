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
      style={{
        backgroundColor: `#${e.bgColor}`
      }}
      onClick={handleEventSelect}
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
const EventList = () => {
  const [search, setSearch] = useState('') // Search by event name
  const [userFilter, setUserFilter] = useState('') // Filter events by user

  const events = useSelector(state => state.events)

  return (
    <div className='event-list'>
      {
        events.map(e => <EventListItem key={e.id} e={e} />)
      }
    </div>
  )
}

export default EventList
