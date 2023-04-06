import { Fragment, useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  //State to show or not show the Cart Modal.
  const [cartIsShown, setCartIsShown] = useState(false);

  //Show the cart function;
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  //Hide cart if click on the background.
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {/* render cart if is true if false don't show. */}
      {/* passing the pointer function "onClose" to hide the cart */}
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {/* passing pointer function to the Header component */}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
