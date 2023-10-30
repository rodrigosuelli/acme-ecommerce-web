import styles from './ProductRating.module.css';
import StarsList from './StarsList';

function ProductRating({ avaliacao, qtd_avaliacoes }) {
  return (
    <div className={styles.productRating}>
      <StarsList numberOfStarsFilled={avaliacao} />
      <span>({qtd_avaliacoes})</span>
    </div>
  );
}

export default ProductRating;
