'use client';

import Image from 'next/image';
import {
  NavigationFilled,
  SearchFilled,
  CartFilled,
} from '@fluentui/react-icons';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../../contexts/cartContext';

import styles from './HeaderMenu.module.css';
import Sidebar from './Sidebar/Sidebar';
import SearchMobile from './SearchMobile/SearchMobile';

function HeaderMenu() {
  const { cart } = useCart();

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  function handleToggleSidebar() {
    setIsSidebarVisible(!isSidebarVisible);
  }

  function handleToggleSearch() {
    setIsSearchVisible(!isSearchVisible);
  }

  return (
    <header className={styles.headerMenu}>
      <button
        onClick={handleToggleSidebar}
        type="button"
        className={styles.iconBtn}
      >
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
        <Link
          href="/carrinho"
          className={`${styles.iconBtn} ${styles.cartLink}`}
        >
          <CartFilled fontSize={32} />
          <div className={styles.cartCount}>{cart ? cart.length : 0}</div>
        </Link>
        <button
          onClick={handleToggleSearch}
          type="button"
          className={styles.iconBtn}
        >
          <SearchFilled fontSize={32} />
        </button>
      </div>
      <div
        onClick={handleToggleSidebar}
        className={
          isSidebarVisible
            ? `${styles.sidebarShadow} ${styles.visible}`
            : styles.sidebarShadow
        }
      />
      <div
        onClick={handleToggleSearch}
        className={
          isSearchVisible
            ? `${styles.sidebarShadow} ${styles.visible}`
            : styles.sidebarShadow
        }
      />
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        setIsSidebarVisible={setIsSidebarVisible}
      />
      <SearchMobile
        isSearchVisible={isSearchVisible}
        setIsSearchVisible={setIsSearchVisible}
      />
    </header>
  );
}

export default HeaderMenu;
