import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory} from 'react-router-dom'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/fi'
import { NextIcon, PrevIcon} from '../assets/icons'

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
    this.props.onNavigate(action)
  } 

  render() {
    return (
      <div className='rbc-toolbar row'>
        <div className='col-lg-4'>
          <h2 className='rbc-toolbar-label'>
            {this.props.label.toUpperCase()}  
          </h2>
        </div>

        <div className='col-lg-4'>
          <span className='rbc-btn-group'>
            <button
              className='rbc-toolbar button'
              onClick={() => this.navigate('PREV')}
            >
              <PrevIcon />
            </button>

            <button
              className='rbc-toolbar button'
              onClick={() => this.navigate('TODAY')}
            >
              Tänään
            </button>
            
            <button
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
const eventStyleGetter = e => ({
  style: {
    backgroundColor: e.bgColor,
    color: e.fgColor
  }
})

const EventCalendar = () => {
  const history = useHistory()
  // UTC-offset in hours used in dates for calendar
  const utcOffset = moment().utcOffset() / 60
  // Fetching events from Redux-store and mapping dates
  const events = useSelector(state => state.events)
    .map(e => {
      if (!e.multi) {
        const start = new Date(e.start)
        start.setHours(start.getHours() - utcOffset)
        return ({
          id: e.id,
          title: e.title,
          start: start,
          end: start
        })
      } else {
        const start = new Date(e.start)
        const end = new Date(e.end)
        start.setHours(start.getHours() - utcOffset)
        end.setHours(end.getHours() - utcOffset)

        return ({
          id: e.id,
          title: e.title,
          start,
          end,

        })
      }
    })
    
  // Fired after event is clicked inside the calendar
  const handleEventSelect = e => {
    // Redirect to the event page
    history.push(`/events/${e.id}`)
  }

  return (
    <div>
      <Calendar
        localizer={momentLocalizer(moment)}
        views={['month']}
        messages={translationsFi}
        onSelectEvent={handleEventSelect}
        popup={true}
        components={components}
        events={events}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  )
}

export default EventCalendar
