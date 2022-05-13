const CartReducer = (state, action) => {
  switch (action) {
    case 'LOAD_CART':
      return {
        ...state,
      }
    default:
      return state
  }
}

export default CartReducer
