import { notFound } from 'next/navigation';
import qs from 'qs';

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

  const url = `${process.env.STRAPI_API_URL}/categorias?${query}`;

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
    req.data.map((categoria) => ({
      slug: categoria.attributes.slug,
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

  if (!data.data.length) {
    notFound();
  }

  // console.log(data);

  // console.log(data.data[0].attributes);
  // console.log(data.data[0].attributes.produtos.data);

  return <h1>Olá categoria: {data.data[0].attributes.titulo}</h1>;
}

export default Categoria;
