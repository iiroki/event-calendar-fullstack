import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { fi } from 'date-fns/locale'

const EventListItem = ({ e }) => (
  <div
    className='event-list-item'
    style={{
      backgroundColor: `#${e.bgColor}`
    }}
  >
    <Link to={`/events/${e.id}`}>
      <span
        className='event-list-item-box'
        style={{ color: `#${e.fgColor}` }}
      >
        <div className='event-list-item-title'>
          {`${e.title}`}
        </div>
        <div className='event-list-item-date'>
          {`${format(e.start, 'd.M.yyyy', { locale: fi })}`}
        </div>
      </span>
    </Link>
  </div>
)

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
