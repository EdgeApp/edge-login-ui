import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { BackAndroid, View, Text, Button } from 'react-native'
import style from '../Style'
import t from '../../lib/web/LocaleStrings'

import { fadeWhiteOverlay } from '../Landing.action'

class Home extends Component {
  componentDidMount = () => {
    const self = this
    BackAndroid.addEventListener('hardwareBackPress', function () {
      return self.handleBack()
    })
  }
  handleBack = () => {
    if (this.props.loader.loading === true) {
      return true
    }
    const self = this
    self.props.dispatch(fadeWhiteOverlay())
    Actions.landing()
    return true
  }

  render () {
    return (
      <View style={style.container} >
        <View style={style.form}>
          <Text style={{fontSize: 40}}>{t('string_home_page')}</Text>
          <Button style={{flex: 1}} onPress={this.handleBack} title={t('string_logout')}>{t('string_logout')}</Button>
        </View>
      </View>
    )
  }
}

export default connect(state => ({
  user: state.user,
  loader: state.loader
}))(Home)
