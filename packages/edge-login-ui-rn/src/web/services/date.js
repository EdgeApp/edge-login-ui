import moment from 'moment'

export default date => {
  return date ? moment(date).format('MMMM DD, YYYY hh:mm:ss A') : ''
}
