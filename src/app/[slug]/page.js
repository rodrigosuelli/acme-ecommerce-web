import styles from './produto.module.css';

export async function generateStaticParams() {
  const url = `${process.env.STRAPI_API_URL}/produtos`;

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
  const url = `${process.env.STRAPI_API_URL}/produtos?filters[slug][$eq]=${slug}`;

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

  return (
    <div className={styles.produtoContainer}>
      <h1>Produto</h1>
      <h1>{produtoData && produtoData.id}</h1>
      <h1>{produtoData && produtoData.attributes.titulo}</h1>
      <h1>{produtoData && produtoData.attributes.descricao}</h1>
    </div>
  );
}

export default Produto;
