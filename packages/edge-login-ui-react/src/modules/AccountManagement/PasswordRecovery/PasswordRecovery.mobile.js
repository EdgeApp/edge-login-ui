import React from 'react'
import Dropdown from 'react-toolbox/lib/dropdown'
import Input from 'react-toolbox/lib/input'

import t from '../../../lib/web/LocaleStrings'
import styles from './PasswordRecovery.mobileStyle.scss'

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
        <div className={styles.rowButtonsHorizontalMobile}>
          <button className={styles.primaryMobile} onClick={handleSubmit}>
            Submit
          </button>
          <button className={styles.secondaryMobile} onClick={gotoAccount}>
            Back
          </button>
        </div>
      )
    }
    if (loader) {
      return (
        <div className={styles.rowButtonsHorizontalMobile}>
          <button className={styles.primaryLoadMobile}>
            <div className={styles.loader} />
          </button>
          <button className={styles.secondaryLoadMobile}>Back</button>
        </div>
      )
    }
  }
  return (
    <div className={styles.container}>
      <form className={styles.forms}>
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
      </form>
      {renderButtons()}
    </div>
  )
}
