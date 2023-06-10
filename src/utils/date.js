import { parseISO, format } from 'date-fns'

export default function Date({ dateString ,css }) {
  const date = parseISO(dateString)
  return <time style={css} dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}