// @flow

const strings = {
  login_button: 'Login',
  username: 'Username',
  password: 'Password',
  forgot_password: 'Forgot Password',
  create_an_account: 'Create an account',
  initiate_password_recovery:
    'Please find the email and click on the link from this device to initiate recovery. ',
  if_recovery_modal:
    'If recovery was set up, you should have emailed yourself a recovery token with a link.',
  choose_recovery_question: 'Choose recovery question',
  submit: 'Submit',
  disable: 'Disable',
  show_password: 'Show Password',
  password_changed: 'Password Changed',
  pwd_change_success: 'Password Successfully Changed',
  pwd_change_modal:
    'DO NOT FORGET YOUR PASSWORD OR RECOVERY ANSWERS! THEY CANNOT BE RECOVERED!',
  backup_key_label: 'Backup Key',
  ok: 'OK',
  next_label: 'Next',
  delete: 'Delete',
  done: 'Done',
  skip: 'SKIP',
  cancel: 'Cancel',
  pin_changed: 'PIN Changed',
  delete_account: 'Delete Account?',
  pin_successfully_changed: 'PIN Successfully Changed',
  delete_account_header: 'Delete Account',
  delete_username_account:
    'Delete %1$s on this device? This will disable access via PIN. If 2FA is enabled on this account, this device will not be able to login without a 2FA reset which takes 7 days.',
  disable_otp_header: 'Are you sure you want to disable 2FA',
  disable_otp_modal_body:
    '2FA will take 7 days to disable if no action is taken by the account user on authentiacated devices',
  disable_otp_button: 'Disable 2FA',
  send_email_error_header: "Can't send email",
  email_error_modal:
    "Please set up an email client that is default to your device's OS in order to send a token to yourself",
  password_recovery: 'Password Recovery',
  otp_auth_code_header: 'Enter Authentication Code',
  save_recovery_token: 'Save recovery token',
  skip_modal_header: 'Are you sure you want to skip?',
  skip_modal_body:
    'Without a password, you will not be able to login on a new device if this device is lost or stolen, or if this app is uninstalled.'
}

export default strings
