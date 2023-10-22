import qs from 'qs';

import useSWR from 'swr';
import { CgSpinner } from 'react-icons/cg';
import api from '../../services/api';
import styles from './carrinho.module.css';
import ProductItem from './ProductItem';

const fetcher = (url) => api.get(url).then((res) => res.data);

function ProductList({ productIdArray }) {
  const query = qs.stringify(
    {
      filters: {
        id: {
          $in: productIdArray,
        },
      },
      populate: { imagens: { fields: ['url', 'formats'] } },
      fields: ['id', 'titulo', 'preco_real', 'qtd_estoque'],
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const { data, error, isLoading } = useSWR(`/api/produtos?${query}`, fetcher);

  // if (error) return <div>failed to load</div>
  // if (isLoading) return <div>loading...</div>

  return (
    <div className={styles.produtosList}>
      {isLoading && !error ? (
        <CgSpinner className="spinner" size={36} />
      ) : (
        data.data.map((produto) => (
          <ProductItem key={produto.id} produtoData={produto} />
        ))
      )}
    </div>
  );
}

export default ProductList;
