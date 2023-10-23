import qs from 'qs';

import { notFound } from 'next/navigation';
import ProductContent from './ProductContent';

async function fetchSlugsByPage({ page }) {
  const query = qs.stringify(
    {
      fields: ['slug'],
      pagination: {
        page,
        pageSize: 250,
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const url = `${process.env.STRAPI_API_URL}/produtos?${query}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  }).then((res) => res.json());

  return response;
}

export async function generateStaticParams() {
  const getAllDataPromiseArray = [];

  const initialRes = await fetchSlugsByPage({ page: 1 });

  const { page, pageCount } = initialRes.meta.pagination;

  if (page < pageCount) {
    for (let i = page + 1; i <= pageCount; i++) {
      const res = fetchSlugsByPage({ page: i });
      getAllDataPromiseArray.push(res);
    }
  }

  const allResponses = await Promise.all(getAllDataPromiseArray);
  allResponses.push(initialRes);

  const staticParamsArrays = allResponses.map((req) =>
    req.data.map((produto) => ({
      slug: produto.attributes.slug,
    }))
  );

  const staticParams = staticParamsArrays.flat();

  return staticParams;
}

async function getData(slug) {
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: { imagens: { fields: ['url', 'formats'] } },
      fields: [
        'id',
        'titulo',
        'descricao',
        'preco_real',
        'avaliacao',
        'qtd_avaliacoes',
      ],
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

async function Produto({ params }) {
  const { slug } = params;

  const data = await getData(slug);
  const produtoData = data.data[0];

  if (!produtoData) {
    notFound();
  }

  return <ProductContent produtoData={produtoData} />;
}

export default Produto;
