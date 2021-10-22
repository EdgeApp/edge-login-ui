import { format } from 'date-fns'

export const toLocalTime = (date: Date): String =>
  format(date, 'MMM d, yyyy h:mm aa')
