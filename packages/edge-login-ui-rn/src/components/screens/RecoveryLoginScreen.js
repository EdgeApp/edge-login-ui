// @flow

import * as React from 'react'
import { Text, View } from 'react-native'

import { loginWithRecovery } from '../../actions/LoginAction.js'
import { getRecoveryQuestions } from '../../actions/PasswordRecoveryActions.js'
import s from '../../common/locales/strings.js'
import { RecoverPasswordUsernameInput } from '../../connectors/componentConnectors/RecoverPasswordUsernameInput.js'
import * as Constants from '../../constants/index.js'
import * as Styles from '../../styles/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { Button } from '../common/Button.js'
import { Header } from '../common/Header.js'
import { FormField } from '../common/index.js'
import SafeAreaViewGradient from '../common/SafeAreaViewGradient.js'
import { SetRecoveryUsernameModal } from '../modals/SetRecoveryUsernameModal.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  showHeader?: boolean
}
type StateProps = {
  loginError: string,
  question1: string,
  question2: string,
  submitButton: string
}
type DispatchProps = {
  getQuestions(): void,
  goBack(): void,
  onCancel(): void,
  submit(string[]): void,
  updateUsername(string): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  question1: string,
  question2: string,
  answer1: string,
  answer2: string,
  showQuestionPicker: boolean,
  focusFirst: boolean,
  focusSecond: boolean,
  errorOne: boolean,
  errorTwo: boolean,
  errorQuestionOne: boolean,
  errorQuestionTwo: boolean,
  disableConfirmationModal: boolean,
  showUsernameModal: boolean
}

class RecoveryLoginScreenComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      question1: this.props.question1,
      question2: this.props.question2,
      answer1: '',
      answer2: '',
      showQuestionPicker: false,
      focusFirst: false,
      focusSecond: false,
      errorOne: false,
      errorTwo: false,
      errorQuestionOne: false,
      errorQuestionTwo: false,
      disableConfirmationModal: false,
      showUsernameModal: true
    }
    this.props.updateUsername('')
  }

  renderHeader = () => {
    if (this.props.showHeader) {
      return <Header onBack={this.props.goBack} />
    }
    return null
  }

  onSubmit = () => {
    const errorOne = this.state.answer1.length < 1 || false
    const errorTwo = this.state.answer2.length < 1 || false

    this.setState({
      errorOne,
      errorTwo
    })
    if (errorOne || errorTwo) {
      return
    }
    const answers = [this.state.answer1, this.state.answer2]
    this.props.submit(answers)
  }

  setAnswer1 = (arg: string) => {
    this.setState({
      answer1: arg
    })
  }

  setAnswer2 = (arg: string) => {
    this.setState({
      answer2: arg
    })
  }

  renderModal = (styles: typeof LoginWithRecoveryStyles) => {
    if (!this.state.showUsernameModal) return null
    const middle = (
      <View style={styles.modalMiddle}>
        <Text style={styles.staticModalText}>
          {s.strings.recover_by_username}
        </Text>
        <RecoverPasswordUsernameInput
          style={styles.inputModal}
          onSubmitEditing={this.props.getQuestions}
        />
      </View>
    )
    return (
      <SetRecoveryUsernameModal
        modalMiddleComponent={middle}
        cancel={this.props.onCancel}
        action={this.props.getQuestions}
      />
    )
  }

  renderError(styles: typeof LoginWithRecoveryStyles) {
    if (this.props.loginError) {
      return (
        <View>
          <View style={styles.shim} />
          <Text style={styles.errorText}>{this.props.loginError}</Text>
          <View style={styles.shim} />
        </View>
      )
    }
    return <View style={styles.shim} />
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.question1 !== this.props.question1) {
      this.setState({
        question1: nextProps.question1,
        question2: nextProps.question2,
        showUsernameModal: false
      })
    }
  }

  render() {
    // const middle = this.renderForm(RecoverPasswordSceneStyles)
    const styles = LoginWithRecoveryStyles
    const form1Style = this.state.errorOne ? styles.inputError : styles.input
    const form2Style = this.state.errorTwo ? styles.inputError : styles.input

    return (
      <SafeAreaViewGradient>
        <View style={styles.screen}>
          {this.renderHeader()}
          <View style={styles.body}>
            <View style={styles.questionRow}>
              <Text style={styles.questionText}>{this.props.question1}</Text>
            </View>
            <View style={styles.answerRow}>
              <FormField
                style={form1Style}
                autoFocus={this.state.focusFirst}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={this.setAnswer1}
                value={this.state.answer1}
                label={s.strings.your_answer_label}
                error={s.strings.answer_case_sensitive}
              />
            </View>
            <View style={styles.shim} />
            <View style={styles.questionRow}>
              <Text style={styles.questionText}>{this.props.question2}</Text>
            </View>
            <View style={styles.answerRow}>
              <FormField
                style={form2Style}
                autoFocus={this.state.focusSecond}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={this.setAnswer2}
                value={this.state.answer2}
                label={s.strings.your_answer_label}
                error={s.strings.answer_case_sensitive}
              />
            </View>
            <View style={styles.buttonContainer}>
              {this.renderError(styles)}
              <Button
                onPress={this.onSubmit}
                downStyle={styles.submitButton.downStyle}
                downTextStyle={styles.submitButton.downTextStyle}
                upStyle={styles.submitButton.upStyle}
                upTextStyle={styles.submitButton.upTextStyle}
                label={this.props.submitButton}
              />
            </View>
          </View>
          {this.renderModal(styles)}
        </View>
      </SafeAreaViewGradient>
    )
  }
}

const LoginWithRecoveryStyles = {
  screen: { ...Styles.ScreenStyle, marginTop: 5 },
  /* gradient: {
    height: THEME.HEADER
  }, */
  body: {
    padding: 18
  },
  questionRow: {
    height: 50,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Constants.GRAY_2
  },
  questionText: {
    color: Constants.GRAY_2,
    fontSize: 18
  },
  modalMiddle: {
    width: '100%',
    height: 120
  },
  inputModal: {
    ...Styles.MaterialInputOnWhite,
    container: { ...Styles.MaterialInputOnWhite.container, width: '100%' }
  },
  answerRow: {
    width: '100%',
    height: 100
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center'
    // height: THEME.BUTTONS.HEIGHT
  },
  input: {
    ...Styles.MaterialInputOnWhite,
    errorColor: Constants.GRAY_2,
    baseColor: Constants.GRAY_2,
    textColor: Constants.GRAY_2,
    titleTextStyle: {
      color: Constants.GRAY_2
    },
    affixTextStyle: {
      color: Constants.GRAY_2
    },
    container: { ...Styles.MaterialInputOnWhite.container, width: '100%' }
  },
  inputUsername: {
    ...Styles.MaterialInputOnWhite,
    errorColor: Constants.ACCENT_RED,
    baseColor: Constants.GRAY_2,
    textColor: Constants.GRAY_2,
    titleTextStyle: {
      color: Constants.GRAY_2
    },
    affixTextStyle: {
      color: Constants.GRAY_2
    },
    container: { ...Styles.MaterialInputOnWhite.container, width: '100%' }
  },
  inputError: {
    ...Styles.MaterialInputOnWhite,
    errorColor: Constants.ACCENT_RED,
    baseColor: Constants.ACCENT_RED,
    textColor: Constants.ACCENT_RED,
    titleTextStyle: {
      color: Constants.ACCENT_RED
    },
    affixTextStyle: {
      color: Constants.ACCENT_RED
    },
    container: { ...Styles.MaterialInputOnWhite.container, width: '100%' }
  },
  shim: {
    height: 20
  },
  textIconButton: Styles.TextAndIconButtonAlignEdgesStyle,
  textIconButtonErrorError: {
    ...Styles.TextAndIconButtonAlignEdgesStyle,
    text: {
      ...Styles.TextAndIconButtonAlignEdgesStyle.text,
      color: Constants.ACCENT_RED
    },
    icon: {
      ...Styles.TextAndIconButtonAlignEdgesStyle.icon,
      color: Constants.ACCENT_RED
    }
  },
  submitButton: {
    upStyle: Styles.PrimaryButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryButtonDownStyle
  },
  disableButton: {
    upStyle: Styles.TertiaryButtonUpStyle,
    upTextStyle: Styles.TertiaryButtonTextUpStyle,
    downTextStyle: Styles.TertiaryButtonTextDownStyle,
    downStyle: Styles.TertiaryButtonDownStyle
  },
  questionsList: {
    width: '100%',
    height: 400,
    borderColor: Constants.GRAY_3,
    borderWidth: 1
  },
  staticModalText: {
    color: Constants.GRAY_1,
    width: '100%',
    fontSize: 15,
    textAlign: 'center'
  },
  errorText: {
    color: Constants.ACCENT_RED,
    width: '90%',
    fontSize: 14,
    textAlign: 'center',
    paddingBottom: 5
  },
  listItem: Styles.ListItemTextOnly
}

export const RecoveryLoginScreen = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    loginError: state.login.errorMessage || '',
    question1:
      state.passwordRecovery.userQuestions.length > 0
        ? state.passwordRecovery.userQuestions[0]
        : s.strings.choose_recovery_question,
    question2:
      state.passwordRecovery.userQuestions.length > 1
        ? state.passwordRecovery.userQuestions[1]
        : s.strings.choose_recovery_question,
    showHeader: true,
    submitButton: s.strings.submit
  }),
  (dispatch: Dispatch) => ({
    getQuestions() {
      dispatch(getRecoveryQuestions())
    },
    goBack() {
      dispatch({ type: 'WORKFLOW_START', data: 'passwordWF' })
    },
    onCancel() {
      dispatch({ type: 'CANCEL_RECOVERY_KEY' })
    },
    submit(answers: string[]) {
      dispatch(loginWithRecovery(answers))
    },
    updateUsername(username: string) {
      dispatch({ type: 'AUTH_UPDATE_USERNAME', data: username })
    }
  })
)(RecoveryLoginScreenComponent)
