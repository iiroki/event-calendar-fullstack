import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import EditEventPage from './EditEventPage'
import { deleteExistingEvent } from '../reducers/eventReducer'
import {
  setNotification,
  notificationTypes,
  expiredTokenNotification
} from '../reducers/notificationReducer'
import {
  EditIcon,
  DeleteIcon
} from '../assets/icons'

// List item for a single event including buttons
const ManageEventsListItem = ({ eventObject, editHandler, deleteHandler }) => (
  <div className='form-row'>
    <Link className='link-manage' to={`/events/${eventObject.id}`}>
      <b>{eventObject.title}</b>
    </Link>
    (
    {moment(eventObject.start).format('DD.MM.YYYY')}
    )
    [
    <button
      type='button'
      className='manage-event-button'
      onClick={() => editHandler(eventObject)}
    >
      <EditIcon />
    </button>

    <button
      type='button'
      className='manage-event-button'
      onClick={() => deleteHandler(eventObject)}
    >
      <DeleteIcon />
    </button>
    ]
  </div>
)

// Lists all events of an user and
const ManageEventsList = () => {
  const userId = useSelector(state => state.login.id)
  const events = useSelector(state => state.events)
    .filter(e => e.organizer_id === userId)
    // Sort by dates (descending)
    .sort((e1, e2) => new Date(e2.start) - new Date(e1.start))

  const [eventToEdit, setEventToEdit] = useState(null)
  const dispatch = useDispatch()

  const backHandler = () => setEventToEdit(null)

  const handleDelete = async eventToDelete => {
    const msg = `Poista tapahtuma "${eventToDelete.title}"?`

    // Confirmation that the event is to be deleted
    if (!window.confirm(msg)) { // eslint-disable-line
      return
    }

    try {
      await dispatch(deleteExistingEvent(eventToDelete.id))

      dispatch(setNotification(
        `Tapahtuma "${eventToDelete.title}" poistettu.`,
        notificationTypes.GOOD
      ))
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setNotification(
          'Poistettavaa tapahtumaa ei löytynyt (jo mahdollisesti poistettu).',
          notificationTypes.ERROR
        ))
      } else if (error.response.status === 401) {
        dispatch(expiredTokenNotification())
      } else {
        dispatch(setNotification(
          'Virhe tapahtumaa poistaessa.',
          notificationTypes.ERROR
        ))
      }
    }
  }

  // If editing an event
  if (eventToEdit) {
    return (
      <EditEventPage
        eventToModify={eventToEdit}
        backHandler={backHandler}
      />
    )
  }

  return (
    <div>
      Tapahtumat lajiteltu päivämäärän mukaan laskevasti.
      <br />
      <EditIcon />
      = Muokkaa tapahtumaa
      <br />
      <DeleteIcon />
      = Poista tapahtuma
      <hr />
      {
        events.length === 0
          ? (
            <div className='form-row'>
              <b>Ei tapahtumia :(</b>
            </div>
          )
          : (
            events.map(e => (
              <ManageEventsListItem
                key={e.id}
                eventObject={e}
                editHandler={setEventToEdit}
                deleteHandler={handleDelete}
              />
            ))
          )
        }
    </div>
  )
}

export default ManageEventsList
