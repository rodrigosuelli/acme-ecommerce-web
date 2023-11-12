import qs from 'qs';

import styles from './ProdutosCarouselSection.module.css';
import ListaProdutosCarousel from './ListaProdutosCarousel';

async function getProdutosByCategory(categoriaSlug) {
  const query = qs.stringify(
    {
      filters: {
        categorias: {
          slug: {
            $eq: categoriaSlug,
          },
        },
      },
      populate: { imagens: { fields: ['url', 'formats'] } },
      fields: ['id', 'titulo', 'preco_real', 'slug'],
      sort: ['id:desc'],
      pagination: {
        page: 1,
        pageSize: 8,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const url = `${process.env.STRAPI_API_URL}/produtos?${query}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function ProdutosCarouselSection({ categoriaSlug }) {
  const dataProdutos = await getProdutosByCategory(categoriaSlug);

  const arrayProdutos = dataProdutos.data;

  return (
    <>
      {arrayProdutos.length ? (
        <ListaProdutosCarousel arrayProdutos={arrayProdutos} />
      ) : (
        <h1 className={styles.emptyTitle}>
          Não há nenhum produto nesta categoria...
        </h1>
      )}
    </>
  );
}

export default ProdutosCarouselSection;
