'use client';

import Image from 'next/image';

import {
  NavigationFilled,
  SearchFilled,
  CartFilled,
} from '@fluentui/react-icons';
import Link from 'next/link';
import logoImg from '../../../../public/images/logo.svg';
import styles from './HeaderMenu.module.css';

function HeaderMenu() {
  return (
    <header className={styles.headerMenu}>
      <button type="button" className={styles.iconBtn}>
        <NavigationFilled fontSize={32} />
      </button>
      <Link href="/" className={styles.logoLink}>
        <Image priority={true} src={logoImg} alt="Logo Acme" />
      </Link>
      <div className={styles.rightItems}>
        <Link href="/carrinho" className={styles.iconBtn}>
          <CartFilled fontSize={32} />
        </Link>
        <button type="button" className={styles.iconBtn}>
          <SearchFilled fontSize={32} />
        </button>
      </div>
    </header>
  );
}

export default HeaderMenu;
