import Image from 'next/image';
import Link from 'next/link';
import styles from './ProdutosCarouselSection.module.css';

function ProdutoCarouselItem({ produtoData }) {
  const { titulo, preco_real, slug, imagens } = produtoData.attributes;

  const preco = preco_real.toFixed(2).replace('.', ',');
  const precoEm10X = (preco_real / 10).toFixed(2).replace('.', ',');

  const imgThumbUrl = imagens?.data[0]?.attributes.formats?.thumbnail.url;

  return (
    <div className={styles.produtoCarouselItemContainer}>
      <Image
        src={imgThumbUrl}
        alt="imagem miniatura do produto"
        width={156}
        height={156}
      />
      <div className={styles.categoryLabel}>Lançamento</div>
      <Link href={`/produto/${slug}`}>
        <h1>{titulo}</h1>
      </Link>
      <span className={styles.price}>R${preco}</span>
      <p>10x sem juros de R${precoEm10X}</p>
    </div>
  );
}

export default ProdutoCarouselItem;
