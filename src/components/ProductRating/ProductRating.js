'use client';

import { StarFilled, StarRegular } from '@fluentui/react-icons';
import styles from './ProductRating.module.css';

function ProductRating() {
  return (
    <div className={styles.productRating}>
      <StarFilled fontSize={18} />
      <StarFilled fontSize={18} />
      <StarFilled fontSize={18} />
      <StarFilled fontSize={18} />
      <StarRegular fontSize={18} />
      <span>(22)</span>
    </div>
  );
}

export default ProductRating;
