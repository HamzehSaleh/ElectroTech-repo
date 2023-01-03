const initalState = {
  loading: false,
  cartItems: [],
};

export const rootReducer = (state = initalState, action) => {
  switch (action.type) {
    case "SHOW_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "HIDE_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case "DELETE_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => {
          return item._id !== action.payload._id;
        }),
      };

    case "UPDATE_CART":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};
