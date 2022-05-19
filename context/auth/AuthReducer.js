const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      }
    case 'AUTH_LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      }
    default:
      return state
  }
}

export default AuthReducer
