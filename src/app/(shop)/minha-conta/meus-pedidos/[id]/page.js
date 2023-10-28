'use client';

import qs from 'qs';

import useSWR from 'swr';
import withPrivateRoute from '../../../../hoc/withPrivateRoute';
import api from '../../../../services/api';
import styles from './pedido.module.css';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';

const query = qs.stringify(
  {
    fields: ['id', 'publishedAt', 'forma_pagamento', 'status'],
    populate: {
      produtos: {
        fields: ['id', 'qtd', 'valor_subtotal', 'valor_unitario'],
        populate: {
          produto: {
            fields: ['id', 'titulo', 'preco_real', 'slug'],
            populate: { imagens: { fields: ['url', 'formats'] } },
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

const fetcher = (url) => api.get(url).then((res) => res.data);

function Pedido({ params }) {
  const { id } = params;

  const { data, error, isLoading } = useSWR(
    `/api/pedidos/${id}?${query}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (error) {
    return (
      <h3>
        Erro, não foi possível buscar os dados do pedido no banco de dados.
      </h3>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (data?.data) {
    const { publishedAt, forma_pagamento, status } = data.data.attributes;

    return (
      <div className={`shopPage ${styles.pedidoInvidivualPageContainer}`}>
        <h1>Pedido</h1>
        <p>#{id}</p>
        <div className="marker"></div>

        <h2>data</h2>
        <p>{publishedAt}</p>

        <h2>Status</h2>
        <p>{status}</p>

        <h2>Forma de Pagamento</h2>
        <p>{forma_pagamento}</p>

        <h1>Produtos</h1>
        <div className="marker"></div>
      </div>
    );
  }
}

export default withPrivateRoute(Pedido);
