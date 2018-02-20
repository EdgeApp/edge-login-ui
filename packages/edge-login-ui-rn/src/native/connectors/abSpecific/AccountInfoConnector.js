import { connect } from 'react-redux'
import { AccountInfoComponent } from '../../components/abSpecific/'

export const mapStateToProps = (state, ownProps) => {
  return {
    style: ownProps.style,
    username: state.create.username,
    password: state.create.password,
    pin: state.create.pin,
    passwordMessage: null
  }
}

export default connect(mapStateToProps, null)(AccountInfoComponent)
