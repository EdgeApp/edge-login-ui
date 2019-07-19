const strings = {
  // defaults
  app_edge_name: 'Edge',
  app_edge_website: 'https://edge.app',
  app_edge_local_storage_last_user: 'lastUser',

  // Layout
  headers_login: 'Login to %s',
  footer_text: 'powered by',
  headers_navigation_login: 'Login',
  headers_navigation_signup: 'Sign Up',

  // Login
  login_new_account_create_account: 'Create Account',
  login_new_account_signin_text: 'Already have an account? ',
  login_new_account_signin: 'Sign In',
  login_edge_header: 'Scan or tap to login with Edge Wallet',
  login_edge_loading_qr: 'Please wait while we fetch your QR code',
  login_edge_button: 'Launch Edge Wallet',
  login_with_password_header: 'Welcome Back!',
  login_with_password_sub_header: 'Login with your username and password',
  login_with_password_forgot_password: 'Forgot your Password?',
  login_with_pin_sub_header: 'Login with your PIN',
  login_with_pin_exit_pin_screen: 'Exit PIN Login',

  // Signup
  signup_welcome: 'Welcome!',
  signup_username_header: 'Choose your username',
  signup_username_text1: 'This is not your email or real name.',
  signup_username_text2: 'This is the username to login into your account.',
  signup_username_text3: 'Your username and password are known only to you.',
  signup_username_username_error_minimum:
    'Username must be at least 3 characters',
  signup_pin_header: 'Choose your 4-digit PIN',
  signup_pin_text:
    'Your PIN is a 4-digit code used to do quick re-logins into your account',
  signup_password_header: 'Create your password',
  signup_review_header: 'Almost there!',
  signup_review_sub_header: 'Write down your account information.',
  signup_review_warning:
    'If you lose your account information, you will lose access to your funds permanently. Write down and store it securely.',
  signup_review_details_text: 'Show my account info',

  // Account
  account_welcome: 'Welcome, %s',
  account_home_change_pin: 'Change PIN',
  account_home_change_password: 'Change Password',
  account_home_recover_password: 'Setup/Change Password Recovery',
  account_home_edge_login:
    'Please use the Edge Wallet app to change your account settings.',
  account_home_download_edge: 'Download Edge',
  account_pin_text: 'Change your 4-digit PIN',
  account_pin_success_message: 'PIN Successfully Changed!',
  account_password_text: 'Change your password',
  account_password_success_message: 'Password Successfully Changed!',
  account_password_recovery_header: 'Password Recovery Setup',
  account_password_recovery_loading_questions:
    'Please wait while we fetch your Password Recovery Questions',
  account_password_recovery_default_question: 'Choose a question',
  account_password_recovery_first_answer: 'First question answer',
  account_password_recovery_second_answer: 'Second question answer',
  account_password_recovery_token_header: 'Save Recovery Token',
  account_password_recovery_token_sub_header:
    'To complete account recovery setup you MUST save an account recovery token. This will be required to recover your account in addition to your username and recovery answers. Please enter your email below to send yourself the recovery token.',
  account_password_recovery_token_send_width: 'Send width:',
  account_password_recovery_token_gmail: 'Gmail',
  account_password_recovery_token_yahoo: 'Yahoo!',
  account_password_recovery_token_hotmail: 'Hotmail or Livemail',
  account_password_recovery_token_generic: 'Email App',

  // Modals
  modal_forgot_password_header: 'Password Recovery',
  modal_forgot_password_p1:
    'If recovery was setup, you should have emailed yourself a recovery token with a link. To recover your account, install the Edge Mobile App on iOS or Android at: ',
  modal_forgot_password_p2:
    'Then click one of the links in the recovery email from a device with Edge installed.',
  modal_account_cache_delete_header: "Delete '%s' on this Device?",
  modal_account_cache_delete_text:
    'This will remove the 2FA and PIN access from this device. If 2FA is enabled on this account, you will be unable to access this account for 7 days on new devices.',
  modal_account_cache_delete_leftButtonText: 'Go Back',
  modal_account_cache_delete_rightButtonText: 'Delete Account',
  modal_account_created_header: 'Account created!',
  modal_account_created_sub_header: 'Your %s account has been created.',
  modal_account_created_text1:
    'Your username and password are known only to you and cannot be reset by %s.',
  modal_account_created_text2:
    'Would you like to set up password recovery questions to reset your account in case of a forgotten password?',
  modal_account_created_button_cancel: 'Do It Later',
  modal_account_created_button_success: 'Setup Recovery',
  modal_account_password_check_header:
    'Enter your password to make changes to your account settings.',
  modal_account_account_password_recovery_success_header:
    'Password Recovery Setup Complete!',
  modal_account_account_password_recovery_success_text1:
    'Please ensure you retain a copy of the email you sent to yourself. Use the link in the email to recover your account if password if forgotten.',
  modal_account_account_password_recovery_success_text2:
    'Didn’t get an email or need to send it again?',
  modal_account_account_password_recovery_success_link:
    'Go back to previous screen',

  // Forms
  label_username: 'Username',
  label_password: 'Password',
  label_pin: 'PIN',
  label_enter_pin: 'Enter PIN',
  label_enter_password: 'Enter Password',
  label_current_password: 'Current Password',
  label_enter_re_password: 'Re-enter Password',
  label_email: 'Email Address',
  password_verification_uppercase: 'Must have at least one uppercase letter',
  password_verification_lowecase: 'Must have at least one lowercase letter',
  password_verification_number: 'Must have at least one number',
  password_verification_characters: 'Must have at least 10 characters',

  // errors
  error_password_incorrect: 'Incorrect Password',
  error_string_unexpected_error: 'Unexpected error: ',
  error_signup_username_unavailable: 'Username is not available',
  error_pin_length: 'PIN must be exactly 4 numbers',
  error_password_insufficient: 'Insufficient Password',
  error_password_not_match: 'Password does not match Re-enter password',
  error_password_recovery_pick_question:
    'You must choose all questions before proceeding.',
  error_password_recovery_insufficient_answer:
    'Answers should be minimum of 4 characters',
  error_password_recovery_token_token:
    'Incorrect or bad Password Recovery Token',
  error_password_recovery_token_email: 'Please enter a valid email address',
  error_server_generic: 'Network/Server error. Please try again later.',
  error_server_timeout: 'Network cannot be reached. Please try again later',
  error_server_bad_password: 'Incorrect username or password',
  error_server_bad_otp:
    'This account has Two Factor Authentication enabled and cannot be logged in using a username and password. Please login by scanning the barcode with the Edge Wallet.',
  error_server_obsolete_api:
    'Obsolete App/Plugin. Please upgrade your App/Plugin to continue.',
  error_server_bad_pin: 'Invalid PIN',

  // Loading Messages
  loading_signup_checking_username: 'Checking Username Availability',
  loading_signup_creating_account: 'Creating and securing account…',
  loading_edge_logging_in: 'Signing in user %s',

  //  Generic strings
  string_yes: 'Yes',
  string_ok: 'Ok',
  string_bundle: 'Bundle',
  string_no: 'No',
  string_or: 'or',
  string_continue: 'Continue',
  string_change: 'Change',
  string_cancel: 'Cancel',
  string_submit: 'Submit',
  string_paste: 'Paste',
  string_paste_address: 'Paste {0}',
  string_search: 'Search',
  string_done: 'Done',
  string_rename: 'Rename',
  string_delete: 'Delete',
  string_save: 'Save',
  string_back: 'Back',
  string_disable: 'Disable',
  string_next: 'Next',
  string_skip: 'Skip',
  string_total: 'Total:',
  string_finish: 'Finish',
  string_help: 'Help',
  string_info: 'Info',
  string_refresh: 'Refresh',
  string_loading: 'Loading...',
  string_pin: 'pin',
  string_password: 'password',
  string_login_with: 'Login With'
}

export default strings
