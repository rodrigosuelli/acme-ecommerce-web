import qs from 'qs';
import { notFound } from 'next/navigation';
import styles from './categoria.module.css';
import ProdutoCategoria from './ProdutoCategoria';
import isNumeric from '../../utils/isNumericString';

async function getCategoria(slug) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      fields: ['id', 'titulo'],
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
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function getProdutos(categoriaSlug, page = 1) {
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
      fields: [
        'id',
        'titulo',
        'preco_real',
        'preco_original',
        'avaliacao',
        'qtd_avaliacoes',
        'slug',
      ],
      pagination: {
        page,
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

async function Categoria({ params, searchParams }) {
  const { categoria: categoriaSlug } = params;
  let { page } = searchParams;

  if (!isNumeric(page)) {
    page = 1;
  }

  const responseArr = await Promise.all([
    getCategoria(categoriaSlug),
    getProdutos(categoriaSlug, page),
  ]);

  const categoriaData = responseArr[0].data[0];

  if (!categoriaData) {
    notFound();
  }

  const { titulo } = categoriaData.attributes;

  const dataProdutos = responseArr[1];

  const { meta } = dataProdutos;

  if (meta.pagination.page > meta.pagination.pageCount) {
    notFound();
  }

  const arrayProdutos = dataProdutos.data;

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
