import qs from 'qs';

import { notFound } from 'next/navigation';

import Image from 'next/image';
import ProductRating from '../../../components/ProductRating/ProductRating';
import styles from './produto.module.css';

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
    produtoData.attributes.imagens?.data[0]?.attributes.formats?.small.url;
  const imgThumbUrl =
    produtoData.attributes.imagens?.data[0]?.attributes.formats?.thumbnail.url;

  return (
    <div className={styles.produtoContainer}>
      <Image
        className={styles.mainImg}
        priority={true}
        src={imgUrl}
        alt="imagem do produto"
        width={280}
        height={280}
      />
      <div className={styles.imgThumbs}>
        <Image
          className={styles.mainImg}
          priority={true}
          src={imgThumbUrl}
          alt="imagem miniatura do produto"
          width={64}
          height={64}
        />
        <Image
          className={styles.mainImg}
          priority={true}
          src={imgThumbUrl}
          alt="imagem miniatura do produto"
          width={64}
          height={64}
        />
        <Image
          className={styles.mainImg}
          priority={true}
          src={imgThumbUrl}
          alt="imagem miniatura do produto"
          width={64}
          height={64}
        />
        <Image
          className={styles.mainImg}
          priority={true}
          src={imgThumbUrl}
          alt="imagem miniatura do produto"
          width={64}
          height={64}
        />
      </div>
      <h1 className={styles.productTitle}>{produtoData.attributes.titulo}</h1>
      <ProductRating />
      <h1>{produtoData.id}</h1>
      <h1>{produtoData.attributes.descricao}</h1>
    </div>
  );
}

export default Produto;
