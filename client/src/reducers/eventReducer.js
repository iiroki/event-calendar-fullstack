import eventService from '../services/events'

const initialEvents = []

const eventReducer = (state = initialEvents, action) => {
  switch (action.type) {
    case 'INIT_EVENTS':
      return action.data

    case 'ADD_EVENT':
      return state.concat(action.data)

    case 'DELETE_EVENT':
      return state.filter(e => e.id !== action.data)

    default:
      return state
  }
}

export const initEvents = () => (
  async thunk => {
    const events = await eventService.getAll()

    thunk({
      type: 'INIT_EVENTS',
      data: events
    })
  }
)

export const addNewEvent = eventObject => (
  async thunk => {
    const newEvent = await eventService.addNew(eventObject)

    thunk({
      type: 'ADD_EVENT',
      data: newEvent
    })
  }
)

export const editExistingEvent = eventObject => (
  async thunk => {
    const editedEvent = await eventService.editExisting(eventObject)

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
