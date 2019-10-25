import React, { Component } from 'react'

import t from '../lib/LocaleStrings'
import styles from '../styles/AccountPasswordRecovery.scss'
import Dropdown from './ComponentSelectDropdown'
import ActionButtons from './LayoutActionButtons'

export default class AccountPasswordRecovery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionList: [],
      changeQuestionValue: null,
      selectedQuestion: null
    }
  }

  componentWillMount() {
    this.props.loadQuestions()
  }

  handleSubmit = () => {
    this.props.clearPasswordRecovery()
    const callback = (error, token) => {
      if (error) {
        return this.props.handleError(error.message)
      }
      if (!error && token) {
        return this.props.handleSuccess(token)
      }
    }
    return this.props.handleSubmit(
      {
        questions: [this.props.firstQuestion, this.props.secondQuestion],
        answers: [this.props.firstAnswer, this.props.secondAnswer],
        account: this.props.account
      },
      callback
    )
  }

  renderQuestions1 = () => {
    const filtered = this.props.questions.filter(
      question => this.props.secondQuestion !== question
    )
    const questions = filtered.map(question => ({
      value: question,
      label: question
    }))
    return [
      {
        value: t('account_password_recovery_default_question'),
        label: t('account_password_recovery_default_question')
      },
      ...questions
    ]
  }

  renderQuestions2 = () => {
    const filtered = this.props.questions.filter(
      question => this.props.firstQuestion !== question
    )
    const questions = filtered.map(question => ({
      value: question,
      label: question
    }))
    return [
      {
        value: t('account_password_recovery_default_question'),
        label: t('account_password_recovery_default_question')
      },
      ...questions
    ]
  }

  openDropdownListQuestion1 = () => {
    this.setState({
      questionList: this.renderQuestions1(),
      changeQuestionValue: this.props.changeFirstPasswordRecoveryQuestionValue,
      selectedQuestion: this.props.firstQuestion
    })
  }

  openDropdownListQuestion2 = () => {
    this.setState({
      questionList: this.renderQuestions2(),
      changeQuestionValue: this.props.changeSecondPasswordRecoveryQuestionValue,
      selectedQuestion: this.props.secondQuestion
    })
  }

  closeDropdownList = () => {
    this.setState({
      questionList: [],
      changeQuestionValue: null,
      selectedQuestion: null
    })
  }

  render() {
    if (this.props.loadingQuestions) {
      return (
        <section className={styles.rootContainer}>
          <div className={styles.container}>
            <p className={styles.headerText}>
              {t('account_password_recovery_header')}
            </p>
            <p className={styles.subHeaderText}>
              {t('account_password_recovery_loading_questions')}
            </p>
            <div className={styles.loaderContainer}>
              <div className={styles.loader} />
            </div>
          </div>
        </section>
      )
    }
    return (
      <section className={styles.rootContainer}>
        <div className={styles.container}>
          <p className={styles.headerText}>
            {t('account_password_recovery_header')}
          </p>
          {this.state.questionList.length > 0 && (
            <form className={styles.form}>
              <div className={styles.formGroupDropdown}>
                <label>{t('account_password_recovery_default_question')}</label>
                <Dropdown
                  items={this.state.questionList}
                  onClick={this.state.changeQuestionValue}
                  close={this.closeDropdownList}
                  selected={this.state.selectedQuestion}
                />
              </div>
            </form>
          )}
          {this.state.questionList.length === 0 && (
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label>{t('account_password_recovery_default_question')}</label>
                <input
                  type="text"
                  name="firstQuestion"
                  ref="firstQuestion"
                  value={this.props.firstQuestion}
                  onFocus={this.openDropdownListQuestion1}
                  className={styles.questionInput}
                  disabled={this.props.loading}
                  readOnly
                />
                <div
                  className={styles.caret}
                  onClick={this.openDropdownListQuestion1}
                >
                  <div className={styles.icon} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>{t('account_password_recovery_first_answer')}</label>
                <input
                  type="text"
                  name="firstAnswer"
                  ref="firstAnswer"
                  value={this.props.firstAnswer}
                  onChange={e =>
                    this.props.changeFirstPasswordRecoveryAnswerValue(
                      e.target.value
                    )
                  }
                  disabled={this.props.loading}
                />
              </div>
              <div className={styles.formGroup}>
                <label>{t('account_password_recovery_default_question')}</label>
                <input
                  type="text"
                  name="firstQuestion"
                  ref="firstQuestion"
                  value={this.props.secondQuestion}
                  onFocus={this.openDropdownListQuestion2}
                  className={styles.questionInput}
                  disabled={this.props.loading}
                  readOnly
                />
                <div
                  className={styles.caret}
                  onClick={this.openDropdownListQuestion1}
                >
                  <div className={styles.icon} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>{t('account_password_recovery_second_answer')}</label>
                <input
                  type="text"
                  name="secondAnswer"
                  ref="secondAnswer"
                  value={this.props.secondAnswer}
                  onChange={e =>
                    this.props.changeSecondPasswordRecoveryAnswerValue(
                      e.target.value
                    )
                  }
                  disabled={this.props.loading}
                />
              </div>
            </form>
          )}
          <ActionButtons
            leftText={t('string_cancel')}
            onLeftClick={this.props.openAccountHomeScreen}
            rightText={t('string_submit')}
            onRightClick={this.handleSubmit}
            usage="success"
            loading={this.props.loading}
          />
        </div>
      </section>
    )
  }
}
