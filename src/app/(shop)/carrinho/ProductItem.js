import Image from 'next/image';
import { CaretLeftFilled, CaretRightFilled } from '@fluentui/react-icons';
import { useCart } from '../../contexts/cartContext';
import styles from './carrinho.module.css';

function ProductItem({ produtoData }) {
  const { cart, changeItemQuantity } = useCart();

  const { id } = produtoData;
  const cartItem = cart.find((item) => item.id === id);

  const { titulo, preco_real, imagens } = produtoData.attributes;
  const preco = preco_real.toFixed(2).toString().replace('.', ',');
  const precoEm10X = (preco_real / 10).toFixed(2).toString().replace('.', ',');
  const imgThumbUrl = imagens?.data[0]?.attributes.formats?.thumbnail.url;

  return (
    <div key={id} className={styles.produtoItemContainer}>
      <Image
        priority={true}
        src={imgThumbUrl}
        alt="imagem miniatura do produto"
        width={100}
        height={100}
      />
      <div className={styles.produtoInfo}>
        <h2>{titulo}</h2>
        <h3>R${preco}</h3>
        <p>10x sem juros de R${precoEm10X}</p>
        <p className={styles.qtdTitle}>Quantidade:</p>
        <div className={styles.qtdContainer}>
          <button
            onClick={() => {
              if (cartItem.qtd > 1) changeItemQuantity(id, cartItem.qtd - 1);
            }}
            className={styles.btnChangeQtd}
            type="button"
          >
            <CaretLeftFilled fontSize={18} />
          </button>
          <span>{cartItem.qtd}</span>
          <button
            onClick={() => {
              if (cartItem.qtd < 50) changeItemQuantity(id, cartItem.qtd + 1);
            }}
            className={styles.btnChangeQtd}
            type="button"
          >
            <CaretRightFilled fontSize={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
