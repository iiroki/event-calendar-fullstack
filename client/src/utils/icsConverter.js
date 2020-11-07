import * as ics from 'ics'
import moment from 'moment'

const eventToIcs = eventObject => {
  const s = moment(eventObject.start) // start date in UTC
  const e = moment(eventObject.end) // end date in UTC

  const eventForIcs = {
    title: eventObject.title,
    location: eventObject.location,
    start: [s.year(), s.month() + 1, s.date(), s.hour(), s.minute()],
    end: [e.year(), e.month() + 1, e.date(), e.hour(), e.minute()],
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
