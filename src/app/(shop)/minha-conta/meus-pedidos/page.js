'use client';

import { CgSpinner } from 'react-icons/cg';
import useSWR from 'swr';
import withPrivateRoute from '../../../hoc/withPrivateRoute';
import api from '../../../services/api';
import styles from './meusPedidos.module.css';
import PedidoItem from './PedidoItem';

const fetcher = (url) => api.get(url).then((res) => res.data);

function MeusPedidos() {
  const { data, error, isLoading } = useSWR(
    '/api/pedidos?sort=id:desc',
    fetcher
  );

  if (error) {
    return <h3>Erro, não foi possível buscar os pedidos no banco de dados.</h3>;
  }

  return (
    <div className={`shopPage ${styles.pedidosPageContainer}`}>
      <h1>Meus pedidos</h1>
      <div className="marker"></div>

      <div className={styles.pedidosList}>
        {isLoading && <CgSpinner className="spinner" size={36} />}
        {data?.data &&
          data.data.map((pedido) => (
            <PedidoItem key={pedido.id} pedidoData={pedido} />
          ))}
      </div>
    </div>
  );
}

export default withPrivateRoute(MeusPedidos);
