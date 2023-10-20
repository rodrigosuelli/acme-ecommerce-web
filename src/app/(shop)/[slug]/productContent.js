'use client';

import Image from 'next/image';
import ProductRating from '../../../components/ProductRating/ProductRating';
import InputCEP from '../../../components/InputCEP/InputCEP';
import styles from './produto.module.css';

function ProductContent({ produtoData }) {
  const { titulo, descricao, preco_real, imagens } = produtoData.attributes;
  const preco = preco_real.toFixed(2).toString().replace('.', ',');
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
      <ProductRating />
      <h4 className={styles.productStatus}>Disponível</h4>
      <h3 className={styles.productPrice}>R${preco}</h3>
      <p className={styles.paymentInfo}>Em até 10x de R$ 118,94 sem juros </p>
      <p className={styles.paymentInfo}>Ou em 1x no cartão com até 5% OFF</p>
      <InputCEP />
    </div>
  );
}

export default ProductContent;
