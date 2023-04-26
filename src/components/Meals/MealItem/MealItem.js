import React from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import { useContext } from 'react';
import CartContext from '../../../store/cart-context';

const MealItem = props => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  // Reaching to the cart contect from cart-context provider.
  // addItem which is an function from the Cart-context.
  const addToCartHandler = amount => {
    // passing the item which we foward to the reducer function in the Cart-context component.
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}> {props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        {/* OnAddToCart pointer passing data to MeaItemForm component */}
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
