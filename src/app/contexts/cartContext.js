import { createContext, useContext, useCallback, useMemo } from 'react';

import useLocalStorageCustom from '../hooks/useLocalStorageCustom';

export const CartContext = createContext();

export default function CartContextComp({ children }) {
  const [cart, setCart] = useLocalStorageCustom('cart', null);

  const addItemToCart = useCallback(
    (itemId) => {
      if (!cart) {
        setCart(null);
      }

      // if cart is empty or not iterable
      if (!cart?.length) {
        setCart([itemId]);
      } else {
        setCart([...cart, itemId]);
      }
    },
    [cart, setCart]
  );

  const clearCart = useCallback(() => {
    setCart(null);
  }, [setCart]);

  const contextValue = useMemo(
    () => ({
      cart,
      addItemToCart,
      clearCart,
    }),
    [cart, addItemToCart, clearCart]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

// Custom hook that shorthands the context!
export function useCart() {
  return useContext(CartContext);
}
