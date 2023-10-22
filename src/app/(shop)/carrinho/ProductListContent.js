import { CgSpinner } from 'react-icons/cg';
import ProductItem from './ProductItem';

function ProductListContent({ data, error, isLoading }) {
  if (error) {
    return (
      <h3>Erro, não foi possível buscar os produtos no banco de dados.</h3>
    );
  }

  if (isLoading) {
    return <CgSpinner className="spinner" size={36} />;
  }

  if (data.data) {
    return data.data.map((produto) => (
      <ProductItem key={produto.id} produtoData={produto} />
    ));
  }
}

export default ProductListContent;
