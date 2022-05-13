import { useReducer } from 'react'

import CartContext from './CartContext'
import CartReducer from './CartReducer'

const CartProvider = ({ children }) => {
  const initialState = {
    cart: [],
  }
  const [state, dispatch] = useReducer(CartReducer, initialState)

  // Methods

  return (
    <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>
  )
}

export default CartProvider
