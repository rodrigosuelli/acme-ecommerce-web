'use client';

import qs from 'qs';

import useSWR from 'swr';
import { notFound } from 'next/navigation';
import withPrivateRoute from '../../../../hoc/withPrivateRoute';
import api from '../../../../services/api';
import styles from './pedido.module.css';
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner';
import ProdutoPedido from './ProdutoPedido';

const statusTexts = {
  nao_pago: {
    text: 'Não Pago',
    color: 'red',
  },
  pago: { text: 'Pago', color: 'blue' },
  processando: { text: 'Processando', color: 'blue' },
  enviado: { text: 'Enviado', color: 'blue' },
  concluido: { text: 'Concluído', color: 'green' },
};

const formaPagamentoTexts = {
  pix: 'Pix',
  boleto: 'Boleto',
  cartao_credito: 'Cartão de Crédito',
  cartao_debito: 'Cartão de Débito',
};

const query = qs.stringify(
  {
    fields: [
      'id',
      'publishedAt',
      'forma_pagamento',
      'status',
      'valor_frete',
      'valor_total',
    ],
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
    if (error?.response?.data?.error?.name === 'ForbiddenError') {
      notFound();
    }

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
    const idPedido = data.data.id;
    const {
      publishedAt,
      forma_pagamento,
      status,
      valor_frete,
      valor_total,
      produtos,
    } = data.data.attributes;

    const statusObj = statusTexts[status];
    const { text: statusString, color: statusColor } = statusObj;
    const formaPagamentoString = formaPagamentoTexts[forma_pagamento];

    const dataArray = publishedAt.split('T')[0].split('-');

    const year = dataArray[0];
    const month = dataArray[1];
    const day = dataArray[2];

    const dataString = `${day}/${month}/${year}`;

    return (
      <div className={`shopPage ${styles.pedidoInvidivualPage}`}>
        <div className={styles.pedidoInvidivualPageWrapper}>
          <div className={styles.pageTitleContainer}>
            <h1 className={styles.pageTitle}>Pedido</h1>
            <p>#{idPedido}</p>
            <div className="marker"></div>
          </div>

          <div className={styles.gridContainer}>
            <div className={styles.pedidoIndividualInfoContainer}>
              <h1>Status</h1>
              <p className={`pedidoStatus ${[statusColor]}`}>{statusString}</p>
            </div>
            <div className={styles.pedidoIndividualInfoContainer}>
              <h1>Data</h1>
              <p>{dataString}</p>
            </div>
            <div className={styles.pedidoIndividualInfoContainer}>
              <h1>Pagamento</h1>
              <p>{formaPagamentoString}</p>
            </div>
            <div className={styles.pedidoIndividualInfoContainer}>
              <h1>Valor do Frete</h1>
              <p>R$ {valor_frete.toFixed(2).replace('.', ',')}</p>
            </div>
            <div className={styles.pedidoIndividualInfoContainer}>
              <h1>Valor Total</h1>
              <p className="pedidoStatus blue">
                R$ {valor_total.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>

          <h1>Produtos</h1>
          <div className="marker"></div>

          <div className="pedidosList">
            {produtos.map((produtoPedido) => (
              <ProdutoPedido
                key={produtoPedido.id}
                produtoPedidoData={produtoPedido}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withPrivateRoute(Pedido);
