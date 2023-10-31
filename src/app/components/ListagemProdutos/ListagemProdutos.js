import ProdutoIndividual from './ProdutoIndividual';
import styles from './ListagemProdutos.module.css';

function ListagemProdutos({ arrayProdutos }) {
  return (
    <div className={styles.listaProdutos}>
      {arrayProdutos.map((produto) => (
        <ProdutoIndividual key={produto.id} produtoData={produto} />
      ))}
    </div>
  );
}

export default ListagemProdutos;
