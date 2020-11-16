import * as ics from 'ics'

const eventToIcs = eventObject => {
  const s = eventObject.start
  const e = eventObject.end

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
