import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Calendar } from 'react-big-calendar'
import { format } from 'date-fns'
import { fi } from 'date-fns/locale'
import calendarLocalizer from '../utils/calendarLocalizer'
import { NextIcon, PrevIcon } from '../assets/icons'
import { setSelectedDate } from '../reducers/selectedDateReducer'

// Finnish translations for calendar to use
const translationsFi = {
  next: 'Seuraava',
  previous: 'Edellinen',
  today: 'Tänään',
  month: 'Kuukausi',
  week: 'Viikko',
  day: 'Päivä',
  date: 'Pvm',
  time: 'Aika',
  event: 'Tapahtuma',
  showMore: total => `+ ${total} tapahtumaa`
}

// Custom toolbar layout for calendar
class CustomToolbar extends React.Component {
  navigate = action => {
    const { onNavigate } = this.props
    onNavigate(action)
  }

  render() {
    const { date } = this.props
    const label = format(date, 'MMM yyyy', { locale: fi })

    return (
      <div className='rbc-toolbar row'>
        <div className='col-lg-4'>
          <h2 className='rbc-toolbar-label'>
            {label.toUpperCase()}
          </h2>
        </div>

        <div className='col-lg-4'>
          <span className='rbc-btn-group'>
            <button
              type='button'
              className='rbc-toolbar button'
              onClick={() => this.navigate('PREV')}
            >
              <PrevIcon />
            </button>

            <button
              type='button'
              className='rbc-toolbar button'
              onClick={() => this.navigate('TODAY')}
            >
              Tänään
            </button>

            <button
              type='button'
              className='rbc-toolbar button'
              onClick={() => this.navigate('NEXT')}
            >
              <NextIcon />
            </button>
          </span>
        </div>
      </div>
    )
  }
}

// Custom components passed to the calendar
const components = {
  toolbar: CustomToolbar
}

// Event custom styling
const eventStyleGetter = event => ({
  style: {
    backgroundColor: `#${event.bgColor}`,
    color: `#${event.fgColor}`
  }
})

const EventCalendar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  // Fetching last viewed date from Redux
  const selectedDate = useSelector(state => state.selectedDate)
  // Fetching events from Redux and mapping dates
  const events = useSelector(state => state.events)
    .map(e => {
      if (!e.multi) {
        const start = new Date(e.start)
        return ({
          id: e.id,
          title: e.title,
          start,
          end: start,
          bgColor: e.bgColor,
          fgColor: e.fgColor
        })
      }

      const start = new Date(e.start)
      const end = new Date(e.end)

      return ({
        id: e.id,
        title: e.title,
        start,
        end,
        bgColor: e.bgColor,
        fgColor: e.fgColor
      })
    })

  // Fired after event is clicked inside the calendar
  const handleEventSelect = e => {
    // Redirect to the event page
    history.push(`/events/${e.id}`)
  }

  return (
    <div>
      <Calendar
        culture='fi'
        localizer={calendarLocalizer}
        views={['month']}
        messages={translationsFi}
        onNavigate={d => dispatch(setSelectedDate(d))}
        onSelectEvent={handleEventSelect}
        eventPropGetter={eventStyleGetter}
        components={components}
        popup
        date={selectedDate}
        events={events}
      />
    </div>
  )
}

export default EventCalendar
