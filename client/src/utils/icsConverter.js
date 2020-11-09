import * as ics from 'ics'
import { parseISO } from 'date-fns'

const eventToIcs = eventObject => {
  const s = parseISO(eventObject.start) // start date in UTC
  const e = parseISO(eventObject.end) // end date in UTC

  const eventForIcs = {
    title: eventObject.title,
    location: eventObject.location,
    start: [
      s.getFullYear(),
      s.getMonth() + 1,
      s.getDate(),
      s.getHours(),
      s.getMinutes()
    ],
    end: [
      e.getFullYear(),
      e.getMonth() + 1,
      e.getDate(),
      e.getHours(),
      e.getMinutes()
    ],
    description: eventObject.description,
    productId: 'teekkarikalenteri/ics'
  }

  const { error, value } = ics.createEvent(eventForIcs)

  // Error creating the ics-file
  if (error) {
    return null
  }

  return value
}

export default eventToIcs
