// Users who are allowed to log in (all share the same password)
export const validUsers = [
  'standard_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user',
];

// Logins that must fail, with the error text we expect
export const invalidLogins = [
  { name: 'locked out user', username: 'locked_out_user', password: 'secret_sauce', error: 'this user has been locked out' },
  { name: 'wrong password', username: 'standard_user', password: 'wrong_password', error: 'Username and password do not match' },
  { name: 'unknown user', username: 'no_such_user', password: 'secret_sauce', error: 'Username and password do not match' },
  { name: 'empty username', username: '', password: 'secret_sauce', error: 'Username is required' },
  { name: 'empty password', username: 'standard_user', password: '', error: 'Password is required' },
];