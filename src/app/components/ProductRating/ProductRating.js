'use client';

import { StarFilled, StarRegular } from '@fluentui/react-icons';
import styles from './ProductRating.module.css';

function ProductRating({ avaliacao, qtd_avaliacoes }) {
  function renderStars(numberOfStarsFilled) {
    const contentToRender = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= numberOfStarsFilled) {
        contentToRender.push(<StarFilled fontSize={18} key={i} />);
      } else {
        contentToRender.push(<StarRegular fontSize={18} key={i} />);
      }
    }

    return contentToRender;
  }

  return (
    <div className={styles.productRating}>
      {renderStars(avaliacao)}
      <span>({qtd_avaliacoes})</span>
    </div>
  );
}

export default ProductRating;
