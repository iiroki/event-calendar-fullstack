import { dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { fi } from 'date-fns/locale'

const formatFixWeekday = (d, f, l) => {
  // maanantai -> ma
  if (f === 'cccc') {
    return format(d, 'cccccc', l)
  }

  return format(d, f, l)
}

const calendarLocalizer = dateFnsLocalizer({
  format: (d, f, l) => formatFixWeekday(d, f, l),
  parse,
  startOfWeek,
  getDay,
  locales: { fi }
})

export default calendarLocalizer
