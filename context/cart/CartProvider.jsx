import { useReducer, useEffect } from 'react'
import Cookie from 'js-cookie'
import axios from 'axios'

import CartContext from './CartContext'
import CartReducer from './CartReducer'

const CartProvider = ({ children }) => {
  const initialState = {
    isLoaded: false,
    cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined,
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
    if (Cookie.get('firstName')) {
      const shippingAddress = {
        firstName: Cookie.get('firstName') || '',
        lastName: Cookie.get('lastName') || '',
        address: Cookie.get('address') || '',
        zipCode: Cookie.get('zipCode') || '',
        city: Cookie.get('city') || '',
        country: Cookie.get('country') || '',
        phone: Cookie.get('phone') || '',
      }

      dispatch({
        type: 'CART_LOAD_ADDRESS_FROM_COOKIE',
        payload: shippingAddress,
      })
    }
  }, [])

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    )
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    )
    const tax = Number(process.env.NEXT_PUBLIC_TAX_RATE) * subTotal
    const total = subTotal + tax

    dispatch({
      type: 'CART_UPDATE_ORDER_SUMMARY',
      payload: {
        numberOfItems,
        subTotal,
        tax,
        total,
      },
    })
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

  const updateAddress = (shippingAddress) => {
    const { firstName, lastName, address, zipCode, city, country, phone } =
      shippingAddress
    Cookie.set('firstName', firstName)
    Cookie.set('lastName', lastName)
    Cookie.set('address', address)
    Cookie.set('zipCode', zipCode)
    Cookie.set('city', city)
    Cookie.set('country', country)
    Cookie.set('phone', phone)

    dispatch({
      type: 'CART_UPDATE_ADDRESS_FROM_COOKIE',
      payload: shippingAddress,
    })
  }

  const createOrder = async () => {
    if (!state.shippingAddress) {
      throw new Error('Theres no shipping address')
    }

    const orderBody = {
      items: state.cart,
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
    }

    try {
      const { data } = await axios.post('/api/orders', orderBody)
      dispatch({
        type: 'CART_ORDER_COMPLETED',
      })

      return {
        hasError: false,
        message: data._id,
      }
    } catch (error) {
      if (axios.isAxiosError) {
        return {
          hasError: true,
          message: error.response.data.message,
        }
      }

      return {
        hasError: true,
        message: 'An error has occurred, please try again',
      }
    }
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProduct,
        updateQuantity,
        removeProduct,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
