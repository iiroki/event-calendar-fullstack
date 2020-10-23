import * as ics from 'ics'
import moment from 'moment'

export const eventToIcs = (eventObject, organizer) => {
  const s = moment(eventObject.start) // start date
  const e = moment(eventObject.end) // end date

  const eventForIcs = {
    title: eventObject.title,
    location: eventObject.location,
    organizer: { name: organizer.name },
    start: [s.year(), s.month(), s.date(), s.hour(), s.minute()],
    end: [e.year(), e.month(), e.date(), e.hour(), e.minute()],
    description: eventObject.description,
    productId: 'teekkarikalenteri/ics'
  }

  const { error, value } = ics.createEvent(eventForIcs)

  if (error) {
    return null
  }
  
  return value
}
