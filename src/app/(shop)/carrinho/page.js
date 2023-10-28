'use client';

import qs from 'qs';
import { useCart } from '@/contexts/cartContext';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';
import { useRouter } from 'next/navigation';
import InputCEP from '../../components/Inputs/InputCEP';
import styles from './carrinho.module.css';
import ProductListContent from './ProductListContent';
import api from '../../services/api';
import InputCupom from '../../components/Inputs/InputCupom';
import { useUser } from '../../contexts/userContext';

const fetcher = (url) => api.get(url).then((res) => res.data);

function Carrinho() {
  const { user } = useUser();
  const { cart, setCart, clearCart } = useCart();
  const router = useRouter();

  const [isCreatingPedido, setIsCreatingPedido] = useState(false);
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
      fields: ['id', 'titulo', 'preco_real', 'slug'],
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
  }

  useEffect(() => {
    router.prefetch('/login');
  }, [router]);

  // Remover itens invalidos do carrinho
  useEffect(() => {
    if (savedData?.data && isCartValid) {
      setCart(
        savedData.data.flatMap((produto) => {
          const cartItem = cart.find(
            (item) => item.id === produto.id && item.qtd
          );

          if (cartItem) {
            return { id: produto.id, qtd: cartItem.qtd };
          }

          return [];
        })
      );
    }
  }, [cart, isCartValid, savedData, setCart]);

  const precoFrete = 25;
  let precoFreteString = '';
  let precoProdutos = 0;
  let precoTotal = 0;
  let precoEm10X = 0;

  if (savedData?.data && isCartValid) {
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
    precoFreteString = precoFrete.toFixed(2).replace('.', ',');
    precoProdutos = precoProdutos.toFixed(2).replace('.', ',');
  }

  async function handleCreatePedido() {
    try {
      setIsCreatingPedido(true);

      if (!user) {
        toast.error('Erro: você precisa estar logado para finalizar o pedido.');
        router.push('/login');
        return;
      }

      if (!savedData?.data || !isCartValid) {
        toast.error('Erro: carrinho inválido.');
        return;
      }

      const produtosCarrinho = savedData.data.flatMap((prod) => {
        const cartItem = cart.find((item) => item.id === prod.id && item.qtd);

        if (cartItem) {
          return { produto: prod.id, qtd: cartItem.qtd };
        }

        return [];
      });

      await api.post('/api/pedidos', {
        user: user.id,
        valor_frete: precoFrete,
        produtos: produtosCarrinho,
      });

      clearCart();
      router.push('/');

      toast.success('Pedido finalizado com sucesso.');
    } catch (err) {
      // Let interceptor handle
    } finally {
      setIsCreatingPedido(false);
    }
  }

  return (
    <div className="shopPage">
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
          <h3 className={styles.vazioTitle}>Seu carrinho está vazio.</h3>
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
              <h3 className={styles.priceSmall}>R${precoFreteString}</h3>
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
          <button
            disabled={isCreatingPedido}
            onClick={handleCreatePedido}
            className={`btnPrimary ${styles.btnCarrinho}`}
            type="button"
          >
            {isCreatingPedido ? <CgSpinner size={26} /> : 'Finalizar pedido'}
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
