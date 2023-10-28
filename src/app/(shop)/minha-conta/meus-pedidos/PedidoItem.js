import { ChevronDownFilled, ChevronUpFilled } from '@fluentui/react-icons';
import { useState } from 'react';
import Link from 'next/link';
import styles from './meusPedidos.module.css';

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

function PedidoItem({ pedidoData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { id } = pedidoData;

  const { publishedAt, forma_pagamento, status } = pedidoData.attributes;

  const statusObj = statusTexts[status];
  const { text: statusString, color: statusColor } = statusObj;
  const formaPagamentoString = formaPagamentoTexts[forma_pagamento];

  const dataArray = publishedAt.split('T')[0].split('-');

  const year = dataArray[0];
  const month = dataArray[1];
  const day = dataArray[2];

  const dataString = `${day}/${month}/${year}`;

  function handleToggleExpanded() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className={styles.pedidoItemContainer}>
      <div className={styles.pedidoTitleContainer}>
        <h1>Numero do Pedido</h1>
        <button onClick={handleToggleExpanded} type="button">
          {isExpanded ? (
            <ChevronDownFilled fontSize={26} />
          ) : (
            <ChevronUpFilled fontSize={26} />
          )}
        </button>
      </div>
      <p>#{id}</p>
      {isExpanded && (
        <>
          <div className={styles.pedidoIndividualInfoContainer}>
            <h1>Status</h1>
            <p className={`${styles.pedidoStatus} ${styles[statusColor]}`}>
              {statusString}
            </p>
          </div>
          <div className={styles.pedidoIndividualInfoContainer}>
            <h1>Data</h1>
            <p>{dataString}</p>
          </div>
          <div className={styles.pedidoIndividualInfoContainer}>
            <h1>Pagamento</h1>
            <p>{formaPagamentoString}</p>
          </div>
          <Link
            className={`btnEnter btnPrimary ${styles.btnConferirPedido}`}
            href={`/minha-conta/meus-pedidos/${id}`}
          >
            Conferir Pedido
          </Link>
        </>
      )}
    </div>
  );
}

export default PedidoItem;
