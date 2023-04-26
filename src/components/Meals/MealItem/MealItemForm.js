import React from 'react';
import { useRef, useState } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

const MealItemForm = props => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  // Passing Ref to the Input component
  const amountInputRef = useRef();

  const submitHandler = e => {
    e.preventDefault();

    // Points at the input element from the form. Always current and value.
    const enteredAmount = amountInputRef.current.value;
    // Convert string to a number since the value is always a string.
    const enteredAmountNumber = +enteredAmount;

    // Validation for the form input
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    // if we have valid input we want to excecute our context to add an item to the cart from the context component.
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {/* In order to make refs work with costume components we must go to the component we wanna use it from and wrap the function component with React.forwardRef */}

      {/* Input component to add items to cart */}
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1 - 5) </p>}
    </form>
  );
};

export default MealItemForm;
