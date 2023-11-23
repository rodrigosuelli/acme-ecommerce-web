import Image from 'next/image';
import { Suspense } from 'react';
import { CgSpinner } from 'react-icons/cg';
import InputCEP from '../../../components/Inputs/InputCEP';
import styles from './produto.module.css';
import StarsList from '../../../components/ProductRating/StarsList';
import BtnBuyContainer from './BtnBuyContainer';
import ProdutosCarouselSection from '../../../components/ProdutosCarouselSection/ProdutosCarouselSection';

function ProductContent({ produtoData }) {
  const { id: idProduto } = produtoData;
  const { titulo, descricao, preco_real, imagens, avaliacao, qtd_avaliacoes } =
    produtoData.attributes;

  const preco = preco_real.toFixed(2).replace('.', ',');
  const precoEm10X = (preco_real / 10).toFixed(2).replace('.', ',');
  const imgUrl = imagens?.data[0]?.attributes?.url;
  const imgThumbUrl = imagens?.data[0]?.attributes.formats?.thumbnail.url;

  return (
    <div className={`shopPage ${styles.produtoPage}`}>
      <div className={styles.produtoPageWrapper}>
        <div className={styles.produtoContainer}>
          <div className={styles.imagesContainer}>
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
                className={styles.borderedImg}
                priority={true}
                src={imgThumbUrl}
                alt="imagem miniatura do produto"
                width={64}
                height={64}
              />
              <Image
                className={styles.borderedImg}
                priority={true}
                src={imgThumbUrl}
                alt="imagem miniatura do produto"
                width={64}
                height={64}
              />
              <Image
                className={styles.borderedImg}
                priority={true}
                src={imgThumbUrl}
                alt="imagem miniatura do produto"
                width={64}
                height={64}
              />
              <Image
                className={styles.borderedImg}
                priority={true}
                src={imgThumbUrl}
                alt="imagem miniatura do produto"
                width={64}
                height={64}
              />
            </div>
          </div>
          <div className={styles.produtoDetalhes}>
            <h1 className={styles.productTitle}>{titulo}</h1>
            <div className={styles.productRating}>
              <StarsList numberOfStarsFilled={avaliacao} fontSize={18} />
              <span>({qtd_avaliacoes})</span>
            </div>
            <h4 className={styles.productStatus}>Disponível</h4>
            <h3 className={styles.productPrice}>R$ {preco}</h3>
            <p className={styles.paymentInfo}>
              Em até 10x de R$ {precoEm10X} sem juros{' '}
            </p>
            <p className={styles.paymentInfo}>
              Ou em 1x no cartão com até 5% OFF
            </p>
            <p className={`${styles.paymentInfo} ${styles.seeMoreOptions}`}>
              Ver mais opções de pagamento
            </p>
            <div className={styles.produtoActions}>
              <InputCEP />
              <BtnBuyContainer idProduto={idProduto} />
            </div>
          </div>
        </div>
        <div className={styles.productDesc}>
          <h1>Descrição do Produto</h1>
          {descricao
            .split('\n')
            .map(
              (paragrafo, index) => paragrafo && <p key={index}>{paragrafo}</p>
            )}
        </div>
      </div>
      <div className={styles.titleContainer}>
        <h1>Lançamentos</h1>
        <div className="marker"></div>
      </div>
      <Suspense fallback={<CgSpinner className="spinner" size={34} />}>
        <ProdutosCarouselSection categoriaSlug="lancamentos" />
      </Suspense>
    </div>
  );
}

export default ProductContent;
