import { useReducer } from 'react'

import UiContext from './UiContext'
import UiReducer from './UiReducer'

const UiProvider = ({ children }) => {
  const initialState = {
    isMenuOpen: false,
  }

  const [state, dispatch] = useReducer(UiReducer, initialState)

  const toogleSideMenu = () => {
    dispatch({
      type: 'UI_TOGGLE_MENU',
    })
  }

  return (
    <UiContext.Provider value={{ ...state, toogleSideMenu }}>
      {children}
    </UiContext.Provider>
  )
}

export default UiProvider
