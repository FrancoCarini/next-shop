const CartReducer = (state, action) => {
  switch (action.type) {
    case 'CART_LOAD_CART':
      return {
        ...state,
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
    default:
      return state
  }
}

export default CartReducer
