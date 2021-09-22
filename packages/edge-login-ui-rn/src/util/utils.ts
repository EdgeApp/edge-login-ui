import { format } from 'date-fns'

export const toLocalTime = (date: Date): String =>
  format(date, 'MMM dd, yyyy h:m:s aa')
