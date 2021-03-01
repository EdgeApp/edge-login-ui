// @flow

import { type EdgeRecoveryQuestionChoice } from 'edge-core-js'
import * as React from 'react'
import { Dimensions, Platform, Text, View } from 'react-native'
import Mailer from 'react-native-mail'
import Share from 'react-native-share'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import {
  changeRecoveryAnswers,
  deleteRecovery
} from '../../../actions/PasswordRecoveryActions.js'
import { onComplete } from '../../../actions/WorkflowActions.js'
import s from '../../../common/locales/strings.js'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { isIphoneX } from '../../../util/isIphoneX.js'
import { scale } from '../../../util/scaling.js'
import { Button } from '../../common/Button.js'
import { FullScreenModal } from '../../common/FullScreenModal.js'
import { Header } from '../../common/Header.js'
import { DropDownList, FormField } from '../../common/index.js'
import { TextRowComponent } from '../../common/ListItems/TextRowComponent.js'
import { StaticModal } from '../../common/StaticModal.js'
import { TextAndIconButton } from '../../common/TextAndIconButton.js'
import { EmailAppFailedModal } from '../../modals/EmailAppFailedModal.js'
import { SaveRecoveryTokenModal } from '../../modals/SaveRecoveryTokenModal.js'
import { connect } from '../../services/ReduxStore.js'
import { ChangeRecoveryConfirmScreen } from './ChangeRecoveryConfirmScreen.js'

type OwnProps = {
  showHeader: boolean
}
type StateProps = {
  backupKey: string,
  disableButton: string,
  doneButton: string,
  isEnabled: boolean,
  question1: string,
  question2: string,
  questionsList: EdgeRecoveryQuestionChoice[],
  saveButton: string,
  showEmailDialog: boolean,
  username: string
}
type DispatchProps = {
  cancel(): void,
  deleteRecovery(): void,
  onBack(): void,
  onDone(): void,
  submit(questions: string[], answers: string[]): void
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
  emailAddress: string,
  emailAppNotAvailable: boolean,
  showConfirmationModal: boolean
}

class ChangeRecoveryScreenComponent extends React.Component<Props, State> {
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
      emailAddress: '',
      emailAppNotAvailable: false,
      showConfirmationModal: false
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isEnabled !== this.props.isEnabled) {
      this.setState({
        question1: nextProps.question1,
        question2: nextProps.question2
      })
    }
  }

  renderHeader = () => {
    if (this.props.showHeader) {
      return <Header onBack={this.props.onBack} />
    }
    return null
  }

  handleDisable = () => {
    this.props.deleteRecovery()
    this.setState({
      disableConfirmationModal: true
    })
  }

  handleDisableModalClose = () => {
    this.props.cancel()
  }

  handleSubmit = () => {
    // Launch Modal full Screen
    const errorOne = this.state.answer1.length < 4 || false
    const errorTwo = this.state.answer2.length < 4 || false
    const errorQuestionOne =
      this.state.question1 === s.strings.choose_recovery_question || false
    const errorQuestionTwo =
      this.state.question2 === s.strings.choose_recovery_question || false

    this.setState({
      errorOne,
      errorTwo,
      errorQuestionOne,
      errorQuestionTwo
    })
    if (errorOne || errorTwo || errorQuestionOne || errorQuestionTwo) {
      return
    }
    this.setState({
      showConfirmationModal: true
    })
  }

  handleConfirmQuestionsAndAnswers = () => {
    this.setState({
      showConfirmationModal: false
    })
    const questions = [this.state.question1, this.state.question2]
    const answers = [this.state.answer1, this.state.answer2]
    this.props.submit(questions, answers)
  }

  handleCancelConfirmation = () => {
    this.setState({
      showConfirmationModal: false
    })
  }

  handleQuestion1 = () => {
    this.setState({
      showQuestionPicker: true,
      focusFirst: true,
      focusSecond: false
    })
  }

  handleQuestion2 = () => {
    this.setState({
      showQuestionPicker: true,
      focusFirst: false,
      focusSecond: true
    })
  }

  handleAnswer1 = (arg: string) => {
    this.setState({
      answer1: arg
    })
  }

  handleAnswer2 = (arg: string) => {
    this.setState({
      answer2: arg
    })
  }

  handleQuestionSelected = (data: EdgeRecoveryQuestionChoice) => {
    const question = data.question
    if (this.state.focusFirst) {
      this.setState({
        question1: question,
        showQuestionPicker: false
      })
      return
    }
    this.setState({
      question2: question,
      showQuestionPicker: false
    })
  }

  renderItems = (item: { item: EdgeRecoveryQuestionChoice }) => {
    return (
      <TextRowComponent
        data={item.item}
        title={item.item.question}
        onPress={this.handleQuestionSelected}
        numberOfLines={3}
      />
    )
  }

  renderQuestions = (styles: typeof RecoverPasswordSceneStyles) => {
    return (
      <View style={styles.body}>
        <DropDownList
          style={styles.questionsList}
          data={this.props.questionsList}
          renderRow={this.renderItems}
        />
      </View>
    )
  }

  handleUpdateEmail = (email: string) => {
    this.setState({
      emailAddress: email
    })
  }

  handleEmailApp = () => {
    const body =
      s.strings.otp_email_body +
      this.props.username +
      '<br><br>' +
      'iOS <br>edge://recovery?token=' +
      this.props.backupKey +
      '<br><br>' +
      'Android https://recovery.edgesecure.co/recovery?token=' +
      this.props.backupKey

    Mailer.mail(
      {
        subject: s.strings.otp_email_subject,
        recipients: [this.state.emailAddress],
        body: body,
        isHTML: true
      },
      (error, event) => {
        if (error) {
          console.log(error)
          this.setState({
            emailAppNotAvailable: true
          })
        }
        if (event === 'sent') {
          this.props.onDone()
        }
      }
    )
    if (Platform.OS === 'android') {
      setTimeout(() => {
        this.props.onDone()
      }, 1000)
    }
  }

  handleShare = () => {
    const body =
      s.strings.otp_email_body +
      '\n' +
      this.props.username +
      '\n iOS: edge://recovery?token=' +
      this.props.backupKey +
      '\n Android: https://recovery.edgesecure.co/recovery?token=' +
      this.props.backupKey

    Share.open({ title: s.strings.otp_email_subject, message: body })
      .then(result => {
        this.handleConfirmQuestionsAndAnswers()
        this.props.onDone()
      })
      .catch(error => {
        console.log(error)
      })
  }

  renderForm = (styles: typeof RecoverPasswordSceneStyles) => {
    const form1Style = this.state.errorOne ? styles.inputError : styles.input
    const form2Style = this.state.errorTwo ? styles.inputError : styles.input
    const errorMessageOne = this.state.errorOne
      ? s.strings.answers_four_chanracters
      : s.strings.answer_case_sensitive
    const errorMessageTwo = this.state.errorTwo
      ? s.strings.answers_four_chanracters
      : s.strings.answer_case_sensitive
    const questionOneStyle = this.state.errorQuestionOne
      ? styles.textIconButtonErrorError
      : styles.textIconButton
    const questionTwoStyle = this.state.errorQuestionOne
      ? styles.textIconButtonErrorError
      : styles.textIconButton

    return (
      <View style={styles.body}>
        <View style={styles.questionRow}>
          <TextAndIconButton
            onPress={this.handleQuestion1}
            icon={
              <MaterialIcon
                style={questionOneStyle.icon}
                name="keyboard-arrow-down"
                size={questionOneStyle.iconSize}
              />
            }
            style={questionOneStyle}
            numberOfLines={2}
            title={this.state.question1}
          />
        </View>
        <View style={styles.answerRow}>
          <FormField
            style={form1Style}
            autoFocus={this.state.focusFirst}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={this.handleAnswer1}
            value={this.state.answer1}
            label={s.strings.your_answer_label}
            error={errorMessageOne}
          />
        </View>
        <View style={styles.questionRow}>
          <TextAndIconButton
            onPress={this.handleQuestion2}
            icon={
              <MaterialIcon
                style={questionTwoStyle.icon}
                name="keyboard-arrow-down"
                size={questionTwoStyle.iconSize}
              />
            }
            style={questionTwoStyle}
            numberOfLines={2}
            title={this.state.question2}
          />
        </View>
        <View style={styles.answerRow}>
          <FormField
            style={form2Style}
            autoFocus={this.state.focusSecond}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={this.handleAnswer2}
            value={this.state.answer2}
            label={s.strings.your_answer_label}
            error={errorMessageTwo}
          />
        </View>
        {this.renderButtons(styles)}
      </View>
    )
  }

  renderButtons(styles: typeof RecoverPasswordSceneStyles) {
    if (this.props.isEnabled) {
      return (
        <View style={styles.buttonContainer}>
          <View style={styles.shim} />
          <Button
            onPress={this.handleSubmit}
            downStyle={styles.submitButton.downStyle}
            downTextStyle={styles.submitButton.downTextStyle}
            upStyle={styles.submitButton.upStyle}
            upTextStyle={styles.submitButton.upTextStyle}
            label={this.props.saveButton}
          />
          <View style={styles.shim} />
          <Button
            onPress={this.handleDisable}
            downStyle={styles.disableButton.downStyle}
            downTextStyle={styles.disableButton.downTextStyle}
            upStyle={styles.disableButton.upStyle}
            upTextStyle={styles.disableButton.upTextStyle}
            label={this.props.disableButton}
          />
        </View>
      )
    }
    return (
      <View style={styles.buttonContainer}>
        <View style={styles.shim} />
        <Button
          onPress={this.handleSubmit}
          downStyle={styles.submitButton.downStyle}
          downTextStyle={styles.submitButton.downTextStyle}
          upStyle={styles.submitButton.upStyle}
          upTextStyle={styles.submitButton.upTextStyle}
          label={this.props.doneButton}
        />
      </View>
    )
  }

  renderDisableModal(styles: typeof RecoverPasswordSceneStyles) {
    if (this.state.disableConfirmationModal) {
      const body = (
        <Text style={styles.staticModalText}>
          {s.strings.recovery_disabled}
        </Text>
      )
      return (
        <StaticModal
          // eslint-disable-next-line react/jsx-handler-names
          cancel={this.handleDisableModalClose}
          body={body}
          modalDismissTimerSeconds={8}
        />
      )
    }
    return null
  }

  renderConfirmationScreenModal = (
    styles: typeof RecoverPasswordSceneStyles
  ) => {
    if (this.state.showConfirmationModal) {
      return (
        <FullScreenModal>
          <ChangeRecoveryConfirmScreen
            onCancel={this.handleCancelConfirmation}
            onEmail={this.handleConfirmQuestionsAndAnswers}
            onShare={this.handleShare}
            question1={this.state.question1}
            answer1={this.state.answer1}
            question2={this.state.question2}
            answer2={this.state.answer2}
          />
        </FullScreenModal>
      )
    }
    return null
  }

  showEmailPending(styles: typeof RecoverPasswordSceneStyles) {
    return (
      <View style={styles.modalMiddle}>
        <Text style={styles.staticModalText}>
          {s.strings.recovery_what_account}
        </Text>
        <FormField
          style={styles.inputModal}
          onChangeText={this.handleUpdateEmail}
          value={this.state.emailAddress}
          label={s.strings.email_address}
          error=""
          returnKeyType="go"
          forceFocus
          onSubmitEditing={this.handleEmailApp}
        />
      </View>
    )
  }

  showEmaiFailed(styles: typeof RecoverPasswordSceneStyles) {
    if (this.props.showEmailDialog) {
      return <EmailAppFailedModal action={this.props.cancel} />
    }
    return null
  }

  showEmailDialog(styles: typeof RecoverPasswordSceneStyles) {
    if (this.state.emailAppNotAvailable) {
      return this.showEmaiFailed(styles)
    }
    const middle = (
      <View style={styles.modalMiddle}>
        <Text style={styles.staticModalText}>
          {s.strings.recovery_instructions_complete}
        </Text>
        <FormField
          style={styles.inputModal}
          onChangeText={this.handleUpdateEmail}
          value={this.state.emailAddress}
          label={s.strings.email_address}
          error=""
          returnKeyType="go"
          forceFocus
          onSubmitEditing={this.handleEmailApp}
        />
      </View>
    )
    if (this.props.showEmailDialog) {
      return (
        <SaveRecoveryTokenModal
          modalMiddleComponent={middle}
          cancel={this.props.cancel}
          // eslint-disable-next-line react/jsx-handler-names
          action={this.handleEmailApp}
        />
      )
    }
    return null
  }

  render() {
    const middle = this.state.showQuestionPicker
      ? this.renderQuestions(RecoverPasswordSceneStyles)
      : this.renderForm(RecoverPasswordSceneStyles)
    return (
      <View style={RecoverPasswordSceneStyles.screen}>
        {this.renderHeader()}
        {middle}
        {this.renderDisableModal(RecoverPasswordSceneStyles)}
        {this.showEmailDialog(RecoverPasswordSceneStyles)}
        {this.renderConfirmationScreenModal(RecoverPasswordSceneStyles)}
      </View>
    )
  }
}

const RecoverPasswordSceneStyles = {
  screen: { ...Styles.ScreenStyle },
  body: {
    padding: scale(18)
  },
  questionRow: {
    height: scale(60),
    width: '100%',
    borderColor: Constants.GRAY_2,
    borderBottomWidth: scale(2)
  },
  answerRow: {
    width: '100%',
    height: scale(80)
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center'
  },
  modalMiddle: {
    width: '100%'
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
  inputModal: {
    ...Styles.MaterialInputOnWhite,
    container: {
      position: 'relative',
      width: '100%'
    }
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
    height: scale(20)
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
    upStyle: Styles.PrimaryWidthButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryWidthButtonDownStyle
  },
  disableButton: {
    upStyle: Styles.DefaultWidthButtonUpStyle,
    upTextStyle: Styles.DefaultButtonUpTextStyle,
    downTextStyle: Styles.DefaultButtonDownTextStyle,
    downStyle: Styles.DefaultWidthButtonDownStyle
  },
  questionsList: {
    width: '100%',
    height:
      Dimensions.get('window').height - (isIphoneX ? scale(125) : scale(110)),
    borderColor: Constants.GRAY_3,
    borderWidth: 1
  },
  staticModalText: {
    color: Constants.GRAY_1,
    width: '100%',
    fontSize: scale(13),
    textAlign: 'center'
  }
}

function returnTrunatedUsername(arg) {
  if (arg) {
    return arg.charAt(0) + arg.charAt(1) + '***'
  }
  return arg
}

export const PublicChangeRecoveryScreen = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  (state: RootState) => ({
    backupKey: state.passwordRecovery.recoveryKey || '',
    disableButton: s.strings.disable_password_recovery,
    doneButton: s.strings.done,
    isEnabled: state.passwordRecovery.userQuestions.length > 0,
    question1:
      state.passwordRecovery.userQuestions.length > 0
        ? state.passwordRecovery.userQuestions[0]
        : 'Choose recovery question',
    question2:
      state.passwordRecovery.userQuestions.length > 1
        ? state.passwordRecovery.userQuestions[1]
        : s.strings.choose_recovery_question,
    questionsList: state.passwordRecovery.questionsList,
    saveButton: s.strings.save,
    showEmailDialog: state.passwordRecovery.showRecoveryEmailDialog,
    submitButton: s.strings.submit,
    username: returnTrunatedUsername(state.login.username)
  }),
  (dispatch: Dispatch) => ({
    cancel() {
      dispatch(deleteRecovery())
      dispatch(onComplete())
      dispatch({ type: 'DISMISS_EMAIL_MODAL' })
    },
    deleteRecovery() {
      dispatch(deleteRecovery())
    },
    onBack() {
      dispatch(onComplete())
    },
    onDone() {
      dispatch(onComplete())
    },
    submit(questions: string[], answers: string[]) {
      dispatch(changeRecoveryAnswers(questions, answers))
    }
  })
)(ChangeRecoveryScreenComponent)
