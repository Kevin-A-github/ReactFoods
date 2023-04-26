import React from 'react';
import classes from './Input.module.css';

// React.fowardRef from MealItemForm component. ref arguement is an argument from fowardRef.
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* Setting ref to the input parameter */}
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
