import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteExistingEvent } from '../reducers/eventReducer'
import {
  setNotification,
  notificationTypes,
  expiredTokenNotification
} from '../reducers/notificationReducer'
import { DeleteIcon } from '../assets/icons'
import moment from 'moment'

// List item for a single event including buttons
const ManageEventsListItem = ({ eventObject, deleteHandler }) => (
  <div className='form-row'>
    <Link className='link-manage' to={`/events/${eventObject.id}`}>
      <b>{eventObject.title}</b>
    </Link>
    ({moment(eventObject.start).format('DD.MM.YYYY')})
    [
    {/*<button className='manage-event-button'>
      <EditIcon />
    </button>*/}

    <button
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
    .sort((e1, e2) => new Date(e1.start) - new Date(e2.start))
  
  const dispatch = useDispatch()

  const handleDelete = async blogToDelete => {
    const msg = `Poista tapahtuma "${blogToDelete.title}"?`

    // Confirmation that the event is to be deleted
    if (!window.confirm(msg)) {
      return
    }

    try {
      await dispatch(deleteExistingEvent(blogToDelete.id))

      dispatch(setNotification(
        `Tapahtuma "${blogToDelete.title}" poistettu.`,
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

  return(
    <div>
      Tapahtumat lajiteltu päivämäärän mukaan laskevasti.
      {/*<br/>
      <EditIcon />= Muokkaa tapahtumaa (TBD)*/}
      <br/>
      <DeleteIcon />= Poista tapahtuma
      <hr />
      {
        events.length === 0
          ? <div className='form-row'>
              <b>Ei tapahtumia :(</b>
            </div>
          : events.map(e =>
              <ManageEventsListItem
                key={e.id}
                eventObject={e}
                deleteHandler={handleDelete}
              />
            )
        }
      
    </div>
  )
}

export default ManageEventsList
