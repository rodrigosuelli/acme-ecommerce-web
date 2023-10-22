'use client';

import { useCart } from '@/contexts/cartContext';
import InputCEP from '../../components/InputCEP/InputCEP';
import styles from './carrinho.module.css';
import ProductList from './ProductList';

function Carrinho() {
  const { cart } = useCart();

  let productIdArray = [];

  const isCartValid = cart && cart?.length;

  if (isCartValid) {
    productIdArray = cart.map((item) => item.id);
  }

  const shouldRenderProductList = isCartValid && productIdArray.length;

  return (
    <div className={`shopPage ${styles.carrinhoContainer}`}>
      <h1>Adicionar CEP</h1>
      <div className={styles.marker}></div>
      <InputCEP />
      <h1 className={styles.titleMgTop}>Produtos Selecionados</h1>
      <div className={styles.marker}></div>
      {shouldRenderProductList && (
        <ProductList productIdArray={productIdArray} />
      )}
    </div>
  );
}

export default Carrinho;
