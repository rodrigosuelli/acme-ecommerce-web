import InputCEP from '../../components/InputCEP/InputCEP';
import styles from './carrinho.module.css';

function Carrinho() {
  return (
    <div className={`shopPage ${styles.carrinhoContainer}`}>
      <h1>Adicionar CEP</h1>
      <div className={styles.marker}></div>
      <InputCEP />
      <h1 className={styles.titleMgTop}>Produtos Selecionados</h1>
      <div className={styles.marker}></div>
    </div>
  );
}

export default Carrinho;
