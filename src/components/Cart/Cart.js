import React from 'react';
import { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = props => {
  //Getting access to data from cart-context component
  const carCtx = useContext(CartContext);

  //total amount from cart-context component. toFixed() to be always to dicimals, "$" sting
  const totalAmount = `$${carCtx.totalAmount.toFixed(2)}`;
  //  show button if cart has items > 0
  const hasItems = carCtx.items.length > 0;

  const cartItemRemovehandler = id => {
    carCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    carCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {/* DUMMY DATA [{ id: 'c1', name: 'sushi', amount: 2, price: 12.99 }] */}
      {/* empty items array from cart-context component */}
      {carCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          // Using bind so the functions recieve the items or the ID.
          onRemove={cartItemRemovehandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    // Click on the backdrop to close the modal from App.js
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        {/* We pass "onClose" prop from App.js to hide the cart when button is clicked */}
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {/* If hasItems is true render the button if that's the case */}
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
