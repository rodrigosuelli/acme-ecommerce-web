import { CgSpinner } from 'react-icons/cg';
import ProductItem from './ProductItem';
import { useCart } from '../../contexts/cartContext';

function ProductListContent({ data, error, isLoading }) {
  const { cart } = useCart();

  if (error) {
    return (
      <h3>Erro, não foi possível buscar os produtos no banco de dados.</h3>
    );
  }

  if (isLoading) {
    return <CgSpinner className="spinner" size={36} />;
  }

  if (data.data) {
    if (cart && cart.length) {
      const contentToRender = [];

      cart.forEach((item) => {
        const produtoItem = data.data.find((produto) => produto.id === item.id);

        if (produtoItem) {
          contentToRender.push(
            <ProductItem key={produtoItem.id} produtoData={produtoItem} />
          );
        }
      });

      return contentToRender;
    }
  }
}

export default ProductListContent;
