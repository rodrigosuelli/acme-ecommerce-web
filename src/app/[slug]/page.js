import qs from 'qs';

import { notFound } from 'next/navigation';

import styles from './produto.module.css';

export async function generateStaticParams() {
  const query = qs.stringify(
    {
      fields: ['slug'],
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
  });

  const produtos = await res.json();

  return produtos.data.map((produto) => ({
    slug: produto.attributes.slug,
  }));
}

async function getData(slug) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: { imagens: { fields: ['url'] } },
      fields: ['id', 'titulo', 'descricao'],
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
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function Produto({ params }) {
  const { slug } = params;

  const data = await getData(slug);
  const produtoData = data.data[0];

  if (!produtoData) {
    notFound();
  }

  const imgUrl =
    produtoData.attributes.imagens.data &&
    produtoData.attributes.imagens.data[0].attributes.url;

  return (
    <div className={styles.produtoContainer}>
      <h1>Produto</h1>
      <h1>{produtoData.id}</h1>
      <h1>{produtoData.attributes.titulo}</h1>
      <h1>{produtoData.attributes.descricao}</h1>
      <img src={imgUrl} alt="imagem do produto" />
    </div>
  );
}

export default Produto;
