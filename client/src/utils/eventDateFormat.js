import { format } from 'date-fns'
import { fi } from 'date-fns/locale'

const eventDateFormat = (start, end) => {
  if (start.getDate() === end.getDate()) {
    const sf = format(start, 'EEEEEE d.M.yyyy H:mm', { locale: fi })
    const ef = format(end, 'H:mm', { locale: fi })
    return `${sf} - ${ef}`
  }

  const sf = format(start, 'EEEEEE d.M.yyyy H:mm', { locale: fi })
  const ef = format(end, 'EEEEEE d.M.yyyy H:mm', { locale: fi })
  return `${sf} - ${ef}`
}

export default eventDateFormat
