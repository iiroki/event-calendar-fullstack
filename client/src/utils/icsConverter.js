import * as ics from 'ics'
import moment from 'moment'

export const eventToIcs = (eventObject, organizer) => {
  const utcOffset = moment().utcOffset() / 60
  const s = moment(eventObject.start) // start date
  const e = moment(eventObject.end) // end date

  const eventForIcs = {
    title: eventObject.title,
    location: eventObject.location,
    start: [s.year(), s.month() + 1, s.date(), s.hour() - utcOffset, s.minute()],
    end: [e.year(), e.month() + 1, e.date(), e.hour() - utcOffset, e.minute()],
    description: eventObject.description,
    productId: 'teekkarikalenteri/ics'
  }

  const { error, value } = ics.createEvent(eventForIcs)

  if (error) {
    return null
  }
  
  return value
}
