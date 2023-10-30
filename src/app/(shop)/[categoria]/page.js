import qs from 'qs';
import { notFound } from 'next/navigation';
import styles from './categoria.module.css';
import ProdutoCategoria from './ProdutoCategoria';

async function getData(slug) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      fields: ['id', 'titulo'],
      populate: {
        produtos: {
          fields: [
            'id',
            'titulo',
            'preco_real',
            'preco_original',
            'avaliacao',
            'qtd_avaliacoes',
          ],
          populate: { imagens: { fields: ['url', 'formats'] } },
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const url = `${process.env.STRAPI_API_URL}/categorias?${query}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    cache: 'no-store',
    // next: {
    //   tags: [`product:${slug}`],
    // },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function Categoria({ params }) {
  const { categoria: categoriaSlug } = params;

  const data = await getData(categoriaSlug);

  const categoriaData = data.data[0];

  if (!categoriaData) {
    notFound();
  }

  const { titulo, produtos } = categoriaData.attributes;
  const arrayProdutos = produtos.data;

  return (
    <div className={`shopPage ${styles.categoriaContainer}`}>
      <div className={styles.heroContainer}>
        <h1>Categoria: {titulo}</h1>
        <p>Escolha os produtos desejados</p>
      </div>
      <div className={styles.listaProdutos}>
        {arrayProdutos.length ? (
          arrayProdutos.map((produto) => (
            <ProdutoCategoria key={produto.id} produtoCategoriaData={produto} />
          ))
        ) : (
          <h1>Não há nenhum produto nesta categoria...</h1>
        )}
      </div>
    </div>
  );
}

export default Categoria;
