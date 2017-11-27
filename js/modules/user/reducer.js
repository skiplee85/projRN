import actions from './actions'

const initialState = {
  isLoggedIn: false,
  user: {},
  loading: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actions.USER_LOGIN:
      return { ...state, loading: true }
    case actions.USER_LOGIN_SUCC:
      let user = action.payload
      return {
        isLoggedIn: true,
        user: user,
        loading: false,
      }
    case actions.USER_LOGIN_ERROR:
      console.log(action)
      return { ...state, loading: false }
    default:
      return state;
  }

}
