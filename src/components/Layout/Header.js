import { Fragment } from 'react';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactFoods</h1>
        {/* onClick prop take's the pointer function from App component. */}
        <HeaderCartButton onClick={props.onShowCart} />
      </header>

      <div className={classes['main-image']}>
        <img src={mealsImage} alt="Table of food" />
      </div>
    </Fragment>
  );
};

export default Header;
