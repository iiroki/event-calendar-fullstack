import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Linkify from 'react-linkify'
import { setNotification, notificationTypes } from '../reducers/notificationReducer'
import eventDateFormat from '../utils/eventDateFormat'
import eventToIcs from '../utils/icsConverter'

const EventPage = ({ id }) => {
  const event = useSelector(state => state.events)
    .find(e => e.id.toString() === id)

  const users = useSelector(state => state.users)

  const dispatch = useDispatch()

  // No event found
  if (!event) {
    return (
      <div>
        Tapahtumaa ei löytynyt :(
      </div>
    )
  }

  const organizer = users.find(u => u.id === event.organizer_id)

  // Allows .ics-file downloads
  const downloadIcs = () => {
    // Create .ics-file
    const eventIcs = eventToIcs(event, organizer)

    if (!eventIcs) {
      dispatch(setNotification(
        'Virhe .ics-tiedoston luomisessa.',
        notificationTypes.ERROR
      ))

      return
    }

    // Create a proper file name
    const fileName = event.title.replace(/[^a-zA-Z]/g, '')

    const linkElement = document.createElement('a')

    const file = new Blob([eventIcs],
      { type: 'text/calendar;charset=utf-8' })

    linkElement.href = window.URL.createObjectURL(file)
    linkElement.setAttribute('download', `${fileName}_import.ics`)

    document.body.appendChild(linkElement)
    linkElement.click()

    dispatch(setNotification(
      '.ics-tiedosto luotu onnistuneesti.',
      notificationTypes.GOOD
    ))
  }

  return (
    <div className='event-page-wrapper'>
      <button
        type='button'
        className='btn download-button'
        onClick={downloadIcs}
      >
        + VIE OMAAN KALENTERIIN
      </button>

      <h1>
        {event.title}
      </h1>

      <div className='event-information-box'>
        <div>
          <b>{eventDateFormat(event.start, event.end)}</b>
        </div>

        <div className='form-row'>
          <label // eslint-disable-line
            className='form-row-label'
          >
            Paikka:
          </label>
          {event.location}
        </div>

        <div className='form-row'>
          <label
            htmlFor='organizerLink'
            className='form-row-label'
          >
            Järjestäjä:
          </label>
          <a
            id='organizerLink'
            href={
              organizer.link === null
                ? null
                : organizer.link
            }
            target='_blank'
            rel='noopener noreferrer'
          >
            {organizer.name}
          </a>
        </div>
      </div>

      {
        !event.description
          ? null
          : (
            <div className='event-description-box'>
              <Linkify>
                {event.description}
              </Linkify>
            </div>
          )
      }
    </div>
  )
}

export default EventPage
