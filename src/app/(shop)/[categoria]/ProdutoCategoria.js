import Image from 'next/image';
import { AddFilled } from '@fluentui/react-icons';
import Link from 'next/link';
import styles from './categoria.module.css';
import ProductRating from '../../components/ProductRating/ProductRating';

function ProdutoCategoria({ produtoCategoriaData }) {
  const { id } = produtoCategoriaData;

  const {
    titulo,
    preco_real,
    preco_original,
    avaliacao,
    qtd_avaliacoes,
    imagens,
  } = produtoCategoriaData.attributes;

  const preco = preco_real.toFixed(2).replace('.', ',');
  const precoOriginal = preco_original?.toFixed(2).replace('.', ',');
  const imgThumbUrl = imagens?.data[0]?.attributes.formats?.thumbnail.url;

  return (
    <div key={id} className={styles.produtoCategoriaContainer}>
      <Image
        priority={true}
        src={imgThumbUrl}
        alt="imagem miniatura do produto"
        width={110}
        height={110}
      />
      <h1>{titulo}</h1>
      <span>{preco}</span>
      <ProductRating avaliacao={avaliacao} qtd_avaliacoes={qtd_avaliacoes} />
    </div>
  );
}

export default ProdutoCategoria;
