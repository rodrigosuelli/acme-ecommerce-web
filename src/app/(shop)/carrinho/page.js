'use client';

import qs from 'qs';
import { useCart } from '@/contexts/cartContext';
import useSWR from 'swr';
import { useState } from 'react';
import InputCEP from '../../components/Inputs/InputCEP';
import styles from './carrinho.module.css';
import ProductListContent from './ProductListContent';
import api from '../../services/api';
import InputCupom from '../../components/Inputs/InputCupom';

const fetcher = (url) => api.get(url).then((res) => res.data);

function Carrinho() {
  // const { cart, setCart } = useCart();
  const { cart } = useCart();

  const [savedData, setSavedData] = useState(null);

  let productIdArray = [];

  const isCartValid = cart && cart?.length;

  if (isCartValid) {
    productIdArray = cart.map((item) => item.id);
  }

  const shouldRenderProductList =
    isCartValid && productIdArray.length && !savedData;

  const query = qs.stringify(
    {
      filters: {
        id: {
          $in: productIdArray,
        },
      },
      populate: { imagens: { fields: ['url', 'formats'] } },
      fields: ['id', 'titulo', 'preco_real', 'qtd_estoque', 'slug'],
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const { data, error, isLoading } = useSWR(
    shouldRenderProductList ? `/api/produtos?${query}` : null,
    fetcher
  );

  if (!error && !isLoading && data) {
    setSavedData(data);

    // Set cart with response data
    // TODO: Cannot update component CartContext while rendering Carrinho component, fix the setState()
    // if (data?.data) {
    //   setCart(
    //     data.data.map((produto) => {
    //       const cartItem = cart.find((item) => item.id === produto.id);

    //       return { id: produto.id, qtd: cartItem.qtd };
    //     })
    //   );
    // }
  }

  return (
    <div className={`shopPage ${styles.carrinhoContainer}`}>
      <h1>Adicionar CEP</h1>
      <div className={styles.marker}></div>
      <InputCEP />
      <h1 className={styles.titleMgTop}>Produtos Selecionados</h1>
      <div className={styles.marker}></div>
      <div className={styles.produtosList}>
        {isCartValid ? (
          <ProductListContent
            data={savedData}
            error={error}
            isLoading={isLoading}
          />
        ) : (
          <h3>Seu carrinho está vazio.</h3>
        )}
      </div>
      {isCartValid ? (
        <>
          <h1>Inserir Cupom de Desconto</h1>
          <div className={styles.marker}></div>
          <InputCupom />
          <h1>Resumo da compra</h1>
          <div className={styles.marker}></div>
        </>
      ) : (
        <h1>Continue comprando</h1>
      )}
    </div>
  );
}

export default Carrinho;
