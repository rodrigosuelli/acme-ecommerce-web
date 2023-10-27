'use client';

import qs from 'qs';
import { useCart } from '@/contexts/cartContext';
import useSWR from 'swr';
import { useState } from 'react';
import Link from 'next/link';
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

  let precoProdutos = 0;
  let precoFrete = 25;
  let precoTotal = 0;
  let precoEm10X = 0;

  if (savedData && isCartValid) {
    cart.forEach((item) => {
      const produtoItem = savedData.data.find(
        (produto) => produto.id === item.id
      );
      if (produtoItem) {
        precoProdutos += produtoItem.attributes.preco_real * item.qtd;
      }
    });

    precoEm10X = (precoProdutos / 10).toFixed(2).replace('.', ',');
    precoTotal = (precoFrete + precoProdutos).toFixed(2).replace('.', ',');
    precoFrete = precoFrete.toFixed(2).replace('.', ',');
    precoProdutos = precoProdutos.toFixed(2).replace('.', ',');
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
      {isCartValid && !isLoading && savedData ? (
        <>
          <h1>Inserir Cupom de Desconto</h1>
          <div className={styles.marker}></div>
          <InputCupom />
          <h1 className={styles.titleMgTop}>Resumo da compra</h1>
          <div className={styles.marker}></div>
          <div className={styles.resumoCarrinho}>
            <div className={styles.textContainer}>
              <h2>Valor dos produtos:</h2>
              <h3 className={styles.priceMed}>R${precoProdutos}</h3>
              <div className={styles.separator}></div>
            </div>
            <div className={styles.textContainer}>
              <h2>Frete:</h2>
              <h3 className={styles.priceSmall}>R${precoFrete}</h3>
            </div>
            <div className={styles.textContainer}>
              <div className={styles.textLineSpaced}>
                <h2>Total à prazo:</h2>
                <h3 className={styles.priceSmall}>R${precoTotal}</h3>
              </div>
              <p>(em até 10x de R${precoEm10X} sem juros)</p>
            </div>
            <div className={styles.textContainer}>
              <h2>Total à vista:</h2>
              <h3 className={styles.priceBig}>R${precoTotal}</h3>
              <p>Ganhe até 15% de desconto no pix</p>
            </div>
          </div>
          <button className={`btnPrimary ${styles.btnCarrinho}`} type="button">
            Ir para o pagamento
          </button>
        </>
      ) : null}
      {!isLoading && (
        <Link
          className={`btnEnter btnPrimaryOutline ${styles.btnCarrinho}`}
          href="/"
        >
          Continuar comprando
        </Link>
      )}
    </div>
  );
}

export default Carrinho;
