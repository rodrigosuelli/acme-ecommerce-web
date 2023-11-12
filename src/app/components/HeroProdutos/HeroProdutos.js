import styles from './HeroProdutos.module.css';

function HeroProdutos({ title, text }) {
  return (
    <div className={styles.heroContainer}>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}

export default HeroProdutos;
