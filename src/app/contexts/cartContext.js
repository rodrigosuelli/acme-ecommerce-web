import { createContext, useContext, useCallback, useMemo } from 'react';

import { toast } from 'react-toastify';
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
        setCart([{ id: itemId, qtd: 1 }]);
      } else {
        const itemExists = cart.some((item) => item.id === itemId);

        if (!itemExists) {
          setCart([...cart, { id: itemId, qtd: 1 }]);
        } else {
          toast.error('Oops, este produto já foi adicionado no seu carrinho.', {
            position: 'bottom-right',
          });
        }
      }
    },
    [cart, setCart]
  );

  const changeItemQuantity = useCallback(
    (itemId, newQtd) => {
      if (!cart) {
        setCart(null);
      }

      if (!cart?.length) {
        toast.error(
          'Oops, não é possível realizar esta ação pois seu carrinho está vazio.',
          {
            position: 'bottom-right',
          }
        );
        return;
      }

      const itemExists = cart.some((item) => item.id === itemId && item.qtd);

      if (itemExists) {
        setCart(
          cart.map((item) => {
            if (item.id === itemId) {
              return { ...item, qtd: newQtd };
            }
            return item;
          })
        );
      } else {
        toast.error('Oops, este produto não está no seu carrinho.', {
          position: 'bottom-right',
        });
      }
    },
    [cart, setCart]
  );

  const removeItemFromCart = useCallback(
    (itemId) => {
      if (!cart) {
        setCart(null);
      }

      if (!cart?.length) {
        toast.error(
          'Oops, não é possível realizar esta ação pois seu carrinho está vazio.',
          {
            position: 'bottom-right',
          }
        );
        return;
      }

      const itemExists = cart.some((item) => item.id === itemId && item.qtd);

      if (itemExists) {
        setCart(cart.filter((item) => item.id !== itemId));
      } else {
        toast.error('Oops, este produto não está no seu carrinho.', {
          position: 'bottom-right',
        });
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
      changeItemQuantity,
      removeItemFromCart,
      clearCart,
    }),
    [cart, addItemToCart, changeItemQuantity, removeItemFromCart, clearCart]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

// Custom hook that shorthands the context!
export function useCart() {
  return useContext(CartContext);
}
