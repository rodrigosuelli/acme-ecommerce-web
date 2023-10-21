'use client';

import Image from 'next/image';

import {
  NavigationFilled,
  SearchFilled,
  CartFilled,
} from '@fluentui/react-icons';
import Link from 'next/link';
import styles from './HeaderMenu.module.css';
import { useCart } from '../../contexts/cartContext';

function HeaderMenu() {
  const { cart } = useCart();

  return (
    <header className={styles.headerMenu}>
      <button type="button" className={styles.iconBtn}>
        <NavigationFilled fontSize={32} />
      </button>
      <Link href="/" className={styles.logoLink}>
        <Image
          priority={true}
          src="/images/logo.svg"
          alt="Logo Acme"
          width={91}
          height={30}
        />
      </Link>
      <div className={styles.rightItems}>
        <Link href="/carrinho" className={styles.iconBtn}>
          <CartFilled fontSize={32} />
          <div>{cart ? cart.length : 0}</div>
        </Link>
        <button type="button" className={styles.iconBtn}>
          <SearchFilled fontSize={32} />
        </button>
      </div>
    </header>
  );
}

export default HeaderMenu;
