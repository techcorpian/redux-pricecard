// redux/reducers/products.reducer.js

const initialState = {
  products: []
};

export const saveAllProducts = (products) => ({
  type: 'SAVE_ALL_PRODUCTS',
  payload: products.map(product => ({ ...product, quantity: 1 }))
});

export const updateProductQuantity = (id, quantity) => ({
  type: 'UPDATE_PRODUCT_QUANTITY',
  payload: { id, quantity }
});

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_ALL_PRODUCTS':
      return { ...state, products: action.payload };
    case 'UPDATE_PRODUCT_QUANTITY':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? { ...product, quantity: action.payload.quantity } : product
        )
      };
    default:
      return state;
  }
}
