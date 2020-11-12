import { parseISO } from 'date-fns'
import eventService from '../services/events'

const initialEvents = []
const offsetHoursUTC = new Date().getTimezoneOffset() / 60

const parseHoursUTC = e => {
  const start = parseISO(e.start)
  const end = parseISO(e.end)
  start.setHours(start.getHours() + offsetHoursUTC)
  end.setHours(end.getHours() + offsetHoursUTC)
  e.start = start
  e.end = end
}

const eventReducer = (state = initialEvents, action) => {
  switch (action.type) {
    case 'INIT_EVENTS':
      return action.data

    case 'ADD_EVENT':
      return state.concat(action.data)

    case 'EDIT_EVENT':
      return state.map(e => (
        e.id === action.data.id
          ? action.data
          : e
      ))

    case 'DELETE_EVENT':
      return state.filter(e => e.id !== action.data)

    default:
      return state
  }
}

export const initEvents = () => (
  async thunk => {
    const events = await eventService.getAll()
    events.forEach(e => parseHoursUTC(e))

    thunk({
      type: 'INIT_EVENTS',
      data: events
    })
  }
)

export const addNewEvent = eventObject => (
  async thunk => {
    const newEvent = await eventService.addNew(eventObject)
    parseHoursUTC(newEvent)

    thunk({
      type: 'ADD_EVENT',
      data: newEvent
    })
  }
)

export const editExistingEvent = eventObject => (
  async thunk => {
    const editedEvent = await eventService.editExisting(eventObject)
    parseHoursUTC(editedEvent)

    thunk({
      type: 'EDIT_EVENT',
      data: editedEvent
    })
  }
)

export const deleteExistingEvent = id => (
  async thunk => {
    await eventService.deleteExisting(id)

    thunk({
      type: 'DELETE_EVENT',
      data: id
    })
  }
)

export default eventReducer
