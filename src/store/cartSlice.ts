import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {ProductTypes} from '../react-query/queries/product/products';
import {PersistenceStorage} from '../storage';
import {KEYS} from '../storage/Keys';
// Define a type for the slice state

export type cartType = {
  cartQuantity: number;
} & ProductTypes;

interface authState {
  cart: cartType[];
}

// Define the initial state using that type
const storage = PersistenceStorage;
const StorageCart = storage.getItem(KEYS.CART);
const initialState: authState = {
  //@ts-ignore
  cart: StorageCart ? StorageCart : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductTypes>) => {
      state.cart.some(el => +el.id === action.payload.id)
        ? state.cart.map(el => {
            if (el.id === action.payload.id && el.cartQuantity < el.quantity)
              return (el.cartQuantity += 1);
            else return null;
          })
        : state.cart.push({...action.payload, cartQuantity: 1});

      storage.setItem(KEYS.CART, state.cart);
      //toast.success("Product added to cart");
    },
    increaseQuantity: (state, action: PayloadAction<ProductTypes>) => {
      state.cart.map(el => {
        if (
          +el.id === +action.payload.id &&
          el.cartQuantity < action.payload.quantity
        )
          return (el.cartQuantity += 1);
        else return null;
      });
      storage.setItem(KEYS.CART, state.cart);
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      state.cart.map(el => {
        if (el.id === action.payload && el.cartQuantity > 0)
          return (el.cartQuantity -= 1);
        else return null;
      });
      state.cart = state.cart.filter(el => el.cartQuantity > 0);
      storage.setItem(KEYS.CART, state.cart);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(el => el.id !== action.payload);
      storage.setItem(KEYS.CART, state.cart);
      //toast
    },
    clearCart: state => {
      state.cart = [];
      storage.removeItem(KEYS.CART);
      //toast
    },
    quantityCheck: (state, action: PayloadAction<ProductTypes>) => {
      state.cart.map(el => {
        if (
          +el.id === +action.payload.id &&
          el.cartQuantity > action.payload.quantity
        ) {
          cartSlice.caseReducers.removeItem(state, {payload: el.id, type: ''});
        }
        if (+el.id === +action.payload.id && el.cartQuantity < 1) {
          cartSlice.caseReducers.removeItem(state, {payload: el.id, type: ''});
        }
      });
      storage.setItem(KEYS.CART, state.cart);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
  quantityCheck,
} = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cart.cart;

export default cartSlice.reducer;
