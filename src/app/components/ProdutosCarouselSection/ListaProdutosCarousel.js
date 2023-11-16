'use client';

import Carousel from 'react-multi-carousel';
import ProdutoCarouselItem from './ProdutoCarouselItem';
import styles from './ProdutosCarouselSection.module.css';

function ListaProdutosCarousel({ arrayProdutos }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1299 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1299, min: 969 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 969, min: 759 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 759, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      draggable={false}
      showDots={true}
      responsive={responsive}
      containerClass={styles.carouselContainer}
      itemClass={styles.carouselItem}
      renderDotsOutside={true}
      dotListClass={styles.carouselDotList}
      infinite={true}
    >
      {arrayProdutos.map((produto) => (
        <ProdutoCarouselItem key={produto.id} produtoData={produto} />
      ))}
    </Carousel>
  );
}

export default ListaProdutosCarousel;
