// @flow

import { type EdgeAccount, type EdgeRecoveryQuestionChoice } from 'edge-core-js'
import Mailer from 'react-native-mail'
import Share from 'react-native-share'

import s from '../common/locales/strings.js'
import { showError } from '../components/services/AirshipInstance.js'
import type { Dispatch, GetState, Imports } from '../types/ReduxTypes.js'

/**
 * Prepares what is needed for the change recovery scene.
 */
export const initializeChangeRecovery = (account: EdgeAccount) => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
) => {
  const { context } = imports

  const questionsList: EdgeRecoveryQuestionChoice[] = await context.listRecoveryQuestionChoices()

  // Get the user's questions:
  let userQuestions = []
  const recoveryKey = account.recoveryKey
  if (recoveryKey != null) {
    try {
      userQuestions = await context.fetchRecovery2Questions(
        recoveryKey,
        account.username
      )
    } catch (error) {
      showError(error)
    }
  }

  dispatch({
    type: 'START_CHANGE_RECOVERY',
    data: { questionsList, userQuestions, account }
  })
}

function truncateUsername(username: string): string {
  return username.slice(0, 2) + '***'
}

export function sendRecoveryEmail(
  emailAddress: string,
  username: string,
  recoveryKey: string
): Promise<void> {
  const body =
    s.strings.otp_email_body +
    truncateUsername(username) +
    '<br><br>' +
    'iOS <br>edge://recovery?token=' +
    recoveryKey +
    '<br><br>' +
    'Android https://recovery.edgesecure.co/recovery?token=' +
    recoveryKey

  return new Promise((resolve, reject) =>
    Mailer.mail(
      {
        subject: s.strings.otp_email_subject,
        recipients: [emailAddress],
        body: body,
        isHTML: true
      },
      (error, event) => {
        if (error) reject(error)
        if (event === 'sent') resolve()
      }
    )
  )
}

export async function shareRecovery(
  username: string,
  recoveryKey: string
): Promise<void> {
  const body =
    s.strings.otp_email_body +
    '\n' +
    truncateUsername(username) +
    '\n iOS: edge://recovery?token=' +
    recoveryKey +
    '\n Android: https://recovery.edgesecure.co/recovery?token=' +
    recoveryKey

  await Share.open({ title: s.strings.otp_email_subject, message: body })
}
