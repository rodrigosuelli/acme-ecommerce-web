import Image from 'next/image';
import Link from 'next/link';
import styles from './ListagemProdutos.module.css';
import StarsList from '../ProductRating/StarsList';

function ProdutoIndividual({ produtoData }) {
  const { id } = produtoData;

  const {
    titulo,
    preco_real,
    preco_original,
    avaliacao,
    qtd_avaliacoes,
    slug,
    imagens,
  } = produtoData.attributes;

  const preco = preco_real.toFixed(2).replace('.', ',');
  const precoOriginal = preco_original?.toFixed(2).replace('.', ',');
  const imgThumbUrl = imagens?.data[0]?.attributes.formats?.thumbnail.url;

  return (
    <div key={id} className={styles.produtoIndividualContainer}>
      <Image
        priority={true}
        src={imgThumbUrl}
        alt="imagem miniatura do produto"
        width={110}
        height={110}
      />
      <Link href={`/produto/${slug}`}>
        <h1>{titulo}</h1>
      </Link>
      <span className={styles.priceOriginal}>R${precoOriginal || preco}</span>
      <span className={styles.price}>R${preco}</span>

      <div className={styles.productRating}>
        <StarsList numberOfStarsFilled={avaliacao} fontSize={14} />
        <span>({qtd_avaliacoes})</span>
      </div>
    </div>
  );
}

export default ProdutoIndividual;
