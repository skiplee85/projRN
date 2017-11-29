export default actions = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGIN_SUCC: 'USER_LOGIN_SUCC',
  USER_LOGIN_ERROR: 'USER_LOGIN_ERROR',
  USER_LOGOUT: 'USER_LOGOUT',
  USER_LOGOUT_SUCC: 'USER_LOGOUT_SUCC',
  USER_LOGOUT_ERROR: 'USER_LOGOUT_ERROR',
}

export function userLogin(username, password){
  return {
    type: actions.USER_LOGIN,
    payload:{
      username,
      password,
    }
  }
}