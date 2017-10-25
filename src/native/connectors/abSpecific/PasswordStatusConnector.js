import { connect } from 'react-redux'
import moment from 'moment'
import 'moment-duration-format'
import PasswordStatusComponent
  from '../../components/abSpecific/PasswordStatusComponent'

export const mapStateToProps = (state, ownProps) => {
  let secondsToCrack = '0 seconds to crack'
  if (state.passwordStatus) {
    secondsToCrack = moment
      .duration(state.passwordStatus.secondsToCrack, 'seconds')
      .format('Y [yrs], M [months], D [days], H[hr]:mm[min]:ss[seconds] ')
    secondsToCrack = secondsToCrack + ' to crack'
  }
  return {
    style: ownProps.style,
    status: state.passwordStatus,
    secondsToCrack
  }
}

export default connect(mapStateToProps, null)(PasswordStatusComponent)
