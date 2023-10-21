'use client';

import Image from 'next/image';
import { AddFilled, CartFilled } from '@fluentui/react-icons';
import ProductRating from '../../components/ProductRating/ProductRating';
import InputCEP from '../../components/InputCEP/InputCEP';
import styles from './produto.module.css';
import { useCart } from '../../contexts/cartContext';

function ProductContent({ produtoData }) {
  const { id } = produtoData;
  const { titulo, descricao, preco_real, imagens, avaliacao, qtd_avaliacoes } =
    produtoData.attributes;

  const { addItemToCart } = useCart();

  const preco = preco_real.toFixed(2).toString().replace('.', ',');
  const precoEm10X = (preco_real / 10).toFixed(2).toString().replace('.', ',');
  const imgUrl = imagens?.data[0]?.attributes.formats?.small.url;
  const imgThumbUrl = imagens?.data[0]?.attributes.formats?.thumbnail.url;

  return (
    <div className={styles.produtoContainer}>
      <Image
        className={styles.mainImg}
        priority={true}
        src={imgUrl}
        alt="imagem do produto"
        width={280}
        height={280}
      />
      <div className={styles.imgThumbs}>
        <Image
          className={styles.mainImg}
          priority={true}
          src={imgThumbUrl}
          alt="imagem miniatura do produto"
          width={64}
          height={64}
        />
        <Image
          className={styles.mainImg}
          priority={true}
          src={imgThumbUrl}
          alt="imagem miniatura do produto"
          width={64}
          height={64}
        />
        <Image
          className={styles.mainImg}
          priority={true}
          src={imgThumbUrl}
          alt="imagem miniatura do produto"
          width={64}
          height={64}
        />
        <Image
          className={styles.mainImg}
          priority={true}
          src={imgThumbUrl}
          alt="imagem miniatura do produto"
          width={64}
          height={64}
        />
      </div>
      <h1 className={styles.productTitle}>{titulo}</h1>
      <ProductRating avaliacao={avaliacao} qtd_avaliacoes={qtd_avaliacoes} />
      <h4 className={styles.productStatus}>Disponível</h4>
      <h3 className={styles.productPrice}>R$ {preco}</h3>
      <p className={styles.paymentInfo}>
        Em até 10x de R$ {precoEm10X} sem juros{' '}
      </p>
      <p className={styles.paymentInfo}>Ou em 1x no cartão com até 5% OFF</p>
      <p className={`${styles.paymentInfo} ${styles.seeMoreOptions}`}>
        Ver mais opções de pagamento
      </p>
      <InputCEP />
      <div className={styles.btnBuyContainer}>
        <button className={`btnPrimary ${styles.btnBuy}`} type="button">
          <CartFilled fontSize={26} />
          Comprar
        </button>
        <button
          onClick={() => {
            addItemToCart(id);
          }}
          className={`btnPrimaryOutline ${styles.btnAddToCart}`}
          type="button"
        >
          <AddFilled fontSize={24} />
        </button>
      </div>
      <div className={styles.productDesc}>
        <h1>Descrição do Produto</h1>
        <p>{descricao}</p>
      </div>
    </div>
  );
}

export default ProductContent;
