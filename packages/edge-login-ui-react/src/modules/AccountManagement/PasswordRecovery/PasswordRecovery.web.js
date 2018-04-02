import React from 'react'
import Dropdown from 'react-toolbox/lib/dropdown'
import Input from 'react-toolbox/lib/input'

import t from '../../../lib/web/LocaleStrings'
import styles from './PasswordRecovery.webStyle.scss'

export default ({
  firstQuestion,
  firstAnswer,
  secondQuestion,
  secondAnswer,
  error,
  loader,
  renderQuestions1,
  renderQuestions2,
  handleOnChangeFirstQuestion,
  handleOnChangeFirstAnswer,
  handleOnChangeSecondQuestion,
  handleOnChangeSecondAnswer,
  handleSubmit,
  gotoAccount
}) => {
  const renderButtons = () => {
    if (!loader) {
      return (
        <div className={styles.rowButtons}>
          <button className={styles.secondary} onClick={gotoAccount}>
            Close
          </button>
          <button className={styles.primary} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )
    }
    if (loader) {
      return (
        <div className={styles.rowButtons}>
          <button className={styles.secondaryLoad}>Back</button>
          <button className={styles.primaryLoad}>
            <div className={styles.loader} />
          </button>
        </div>
      )
    }
  }
  return (
    <div className={styles.container}>
      <form>
        <div className={styles.passwordInputs}>
          <Dropdown
            source={renderQuestions1()}
            onChange={handleOnChangeFirstQuestion}
            value={firstQuestion}
            allowBlank={false}
            className={styles.formDropdown}
            error={error.firstQuestion}
            required
          />
          <Input
            type="text"
            name="firstAnswer"
            onChange={handleOnChangeFirstAnswer}
            value={firstAnswer}
            label={t('activity_recovery_first_answer')}
            className={styles.formInput}
            error={error.firstAnswer}
            required
          />
          <p className={styles.note}>
            {error.firstAnswer ? '' : 'Answers are case sensitive'}
          </p>
          <Dropdown
            source={renderQuestions2()}
            onChange={handleOnChangeSecondQuestion}
            value={secondQuestion}
            allowBlank={false}
            className={styles.formDropdown}
            error={error.secondQuestion}
            required
          />
          <Input
            type="text"
            name="secondAnswer"
            onChange={handleOnChangeSecondAnswer}
            value={secondAnswer}
            label={t('activity_recovery_second_answer')}
            className={styles.formInput}
            error={error.secondAnswer}
            required
          />
          <p className={styles.note}>
            {error.secondAnswer ? '' : 'Answers are case sensitive'}
          </p>
        </div>
      </form>
      {renderButtons()}
    </div>
  )
}
