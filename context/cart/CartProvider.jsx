import { useReducer, useEffect } from 'react'
import Cookie from 'js-cookie'

import CartContext from './CartContext'
import CartReducer from './CartReducer'

const CartProvider = ({ children }) => {
  const initialState = {
    cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : [],
  }
  const [state, dispatch] = useReducer(CartReducer, initialState)

  useEffect(() => {
    const cookieCart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : []

    dispatch({
      type: 'CART_LOAD_FROM_COOKIE',
      payload: cookieCart,
    })
  }, [])

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart])

  const addProduct = (product) => {
    dispatch({
      type: 'CART_ADD_PRODUCT',
      payload: product,
    })
  }

  const removeProduct = (product) => {
    dispatch({
      type: 'CART_REMOVE_PRODUCT',
      payload: product,
    })
  }

  const updateQuantity = (product) => {
    dispatch({
      type: 'CART_UPDATE_PRODUCT_QUANTITY',
      payload: product,
    })
  }

  return (
    <CartContext.Provider
      value={{ ...state, addProduct, updateQuantity, removeProduct }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
