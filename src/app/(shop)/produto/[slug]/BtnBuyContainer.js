'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/contexts/cartContext';
import { toast } from 'react-toastify';

import { AddFilled, CartFilled, CheckmarkFilled } from '@fluentui/react-icons';

import styles from './produto.module.css';

function BtnBuyContainer({ idProduto }) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { addItemToCart } = useCart();
  const router = useRouter();

  return (
    <div className={styles.btnBuyContainer}>
      <button
        onClick={() => {
          try {
            if (!isAddedToCart) {
              addItemToCart(idProduto);
            }
            router.push('/carrinho');
          } catch (error) {
            toast.error(error.message, {
              position: 'bottom-right',
            });
          }
        }}
        className={`btnPrimary ${styles.btnBuy}`}
        type="button"
      >
        <CartFilled fontSize={26} />
        Comprar
      </button>
      <button
        onClick={() => {
          try {
            if (isAddedToCart) return;
            addItemToCart(idProduto);
            setIsAddedToCart(true);
          } catch (error) {
            toast.error(error.message, {
              position: 'bottom-right',
            });
          }
        }}
        className={`btnPrimaryOutline ${styles.btnAddToCart}`}
        type="button"
      >
        {isAddedToCart ? (
          <CheckmarkFilled fontSize={24} />
        ) : (
          <AddFilled fontSize={24} />
        )}
      </button>
    </div>
  );
}

export default BtnBuyContainer;
