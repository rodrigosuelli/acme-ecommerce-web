'use client';

import qs from 'qs';

import { CgSpinner } from 'react-icons/cg';
import useSWR from 'swr';
import withPrivateRoute from '../../../hoc/withPrivateRoute';
import api from '../../../services/api';
import styles from './meusPedidos.module.css';
import PedidoItem from './PedidoItem';

const query = qs.stringify(
  {
    fields: ['id', 'publishedAt', 'forma_pagamento', 'status'],
    sort: ['id:desc'],
    pagination: {
      pageSize: 100,
    },
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

const fetcher = (url) => api.get(url).then((res) => res.data);

function MeusPedidos() {
  const { data, error, isLoading } = useSWR(`/api/pedidos?${query}`, fetcher);

  if (error) {
    return <h3>Erro, não foi possível buscar os pedidos no banco de dados.</h3>;
  }

  return (
    <div className={`shopPage ${styles.pedidosPage}`}>
      <div className={styles.pedidosPageWrapper}>
        <div className={styles.pageTitleContainer}>
          <h1 className={styles.pageTitle}>Meus Pedidos</h1>
          <div className="marker"></div>
        </div>

        <div className={styles.pedidosList}>
          {isLoading && <CgSpinner className="spinner" size={36} />}
          {data?.data &&
            data.data.map((pedido) => (
              <PedidoItem key={pedido.id} pedidoData={pedido} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default withPrivateRoute(MeusPedidos);
