import { ChevronDownFilled, ChevronUpFilled } from '@fluentui/react-icons';
import { useState } from 'react';

import styles from './pedido.module.css';
import meusPedidosStyles from '../meusPedidos.module.css';

function ProdutoPedido({ produtoPedidoData }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { qtd, valor_unitario, valor_subtotal, produto } = produtoPedidoData;

  const nome = produto.data.attributes.titulo;

  function handleToggleExpanded() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className={styles.pedidoItemContainer}>
      <div className={styles.pedidoTitleContainer}>
        <h1>{nome}</h1>
        <button onClick={handleToggleExpanded} type="button">
          {isExpanded ? (
            <ChevronDownFilled fontSize={26} />
          ) : (
            <ChevronUpFilled fontSize={26} />
          )}
        </button>
      </div>
      {isExpanded && (
        <>
          <p className={styles.mgTop}>{nome}</p>
          <div className={styles.pedidoIndividualInfoContainer}>
            <h1>Preço Unitário</h1>
            <p>R$ {valor_unitario.toFixed(2).replace('.', ',')}</p>
          </div>
          <div className={styles.pedidoIndividualInfoContainer}>
            <h1>Quantidade</h1>
            <p>{qtd}</p>
          </div>
          <div className={styles.pedidoIndividualInfoContainer}>
            <h1>Preço Subtotal</h1>
            <p
              className={`${meusPedidosStyles.pedidoStatus} ${meusPedidosStyles.blue}`}
            >
              R$ {valor_subtotal.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default ProdutoPedido;
