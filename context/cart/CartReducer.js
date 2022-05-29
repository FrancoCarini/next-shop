const CartReducer = (state, action) => {
  switch (action.type) {
    case 'CART_LOAD_FROM_COOKIE':
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      }
    case 'CART_ADD_PRODUCT':
      const itemToAdd = action.payload
      const existItem = state.cart.find(
        (cartItem) =>
          cartItem._id === itemToAdd._id && cartItem.size === itemToAdd.size
      )

      if (existItem) {
        // Exist item and has same size
        return {
          ...state,
          cart: state.cart.map((cartItem) => {
            if (
              cartItem._id === existItem._id &&
              cartItem.size === existItem.size
            ) {
              return {
                ...cartItem,
                quantity: cartItem.quantity + itemToAdd.quantity,
              }
            }
            return cartItem
          }),
        }
      } else {
        return {
          ...state,
          cart: [...state.cart, itemToAdd],
        }
      }
    case 'CART_ADD_PRODUCT':
      return {
        ...state,
        cart: action.payload,
      }
    case 'CART_UPDATE_PRODUCT_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (
            product._id === action.payload._id &&
            product.size === action.payload.size
          ) {
            return action.payload
          }
          return product
        }),
      }
    case 'CART_REMOVE_PRODUCT':
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.size === action.payload.size
            )
        ),
      }
    case 'CART_UPDATE_ORDER_SUMMARY':
      return {
        ...state,
        ...action.payload,
      }
    case 'CART_LOAD_ADDRESS_FROM_COOKIE':
    case 'CART_UPDATE_ADDRESS_FROM_COOKIE':
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case 'CART_ORDER_COMPLETED':
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        subTotal: 0,
        tax: 0,
        total: 0,
      }
    default:
      return state
  }
}

export default CartReducer
