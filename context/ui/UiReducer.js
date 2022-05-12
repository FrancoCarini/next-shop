const UiReducer = (state, action) => {
  switch (action.type) {
    case 'UI_TOGGLE_MENU':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      }
    default:
      return state
  }
}

export default UiReducer
