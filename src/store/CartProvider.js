import React from 'react';
import CartContext from './cart-context';
import { useReducer } from 'react';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// REDUCER FUNCTION
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // Total cart amount
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //finds the index of the item in the array. If we find the items with the same id it'll return the existing index.
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        // If item exist add both items into one in the cart
        amount: existingCartItem.amount + action.item.amount,
      };
      /// Copy existing items, to update the items inmutably.
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // Adds new item to array, returning a new array without updating the existing array
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      // all items that are not equal to the action.id are kept. since it returns true
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      // returning updates cart data
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    // We pass our reducer function to useRecuer().
    cartReducer,
    // setting an intial state.
    defaultCartState
  );

  const addItemHandler = item => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemHandler = id => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  // Managing the data from cart-context component
  const cartContext = {
    // we pass the default state from cartState.items and cartState.totalAmount.
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {/* This allows us to wrap any components that should get access to this context from CartContext component  */}
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
