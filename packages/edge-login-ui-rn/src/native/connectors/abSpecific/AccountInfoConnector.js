// @flow

import { connect } from 'react-redux'

import type { State } from '../../../types/ReduxTypes'
import { AccountInfoComponent } from '../../components/abSpecific/'
import type { OwnProps } from '../../components/abSpecific/'

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
  return {
    style: ownProps.style,
    username: state.create.username,
    password: state.create.password,
    pin: state.create.pin,
    passwordMessage: null
  }
}

export default connect(mapStateToProps, {})(AccountInfoComponent)
