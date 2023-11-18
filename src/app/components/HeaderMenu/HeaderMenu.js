'use client';

import Image from 'next/image';
import {
  NavigationFilled,
  SearchFilled,
  CartFilled,
  PinFilled,
  NewFilled,
  GiftFilled,
  BriefcaseFilled,
  PersonFilled,
  ChevronUpFilled,
  ChevronDownFilled,
} from '@fluentui/react-icons';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../../contexts/cartContext';

import styles from './HeaderMenu.module.css';
import Sidebar from './Sidebar/Sidebar';
import SearchMobile from './SearchMobile/SearchMobile';

import logoImg from '../../../../public/images/logo.svg';

function HeaderMenu() {
  const { cart } = useCart();

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(7);

  function handleToggleSidebar() {
    setIsSidebarVisible(!isSidebarVisible);
  }

  function handleToggleSearch() {
    setIsSearchVisible(!isSearchVisible);
  }

  return (
    <>
      <header className={styles.headerMenu}>
        <div className={styles.headerWrapper}>
          <button
            onClick={handleToggleSidebar}
            type="button"
            className={styles.hamburguer}
          >
            <NavigationFilled fontSize={32} />
          </button>
          <Link href="/" className={styles.logoLink}>
            <Image priority={true} src={logoImg} alt="Logo Acme" />
          </Link>
          <div className={styles.headerLinks}>
            <Link className={styles.link} href="/">
              Home
            </Link>
            <div className={styles.containerCategorias}>
              <button {...buttonProps} type="button" className={styles.link}>
                Categorias
                {isOpen ? (
                  <ChevronUpFilled fontSize={20} />
                ) : (
                  <ChevronDownFilled fontSize={20} />
                )}
              </button>
              <div
                className={`${styles.dropdownCategorias} ${
                  isOpen && styles.visible
                }`}
                role="menu"
              >
                <Link
                  {...itemProps[0]}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  href="/"
                >
                  Anéis
                </Link>
                <Link
                  {...itemProps[1]}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  href="/brincos"
                >
                  Brincos
                </Link>
                <Link
                  {...itemProps[2]}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  href="/"
                >
                  Colares
                </Link>
                <Link
                  {...itemProps[3]}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  href="/"
                >
                  Pulseiras
                </Link>
                <Link
                  {...itemProps[4]}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  href="/"
                >
                  Kits
                </Link>
                <Link
                  {...itemProps[5]}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  href="/"
                >
                  Pingentes
                </Link>
                <Link
                  {...itemProps[6]}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  href="/"
                >
                  Pins
                </Link>
              </div>
            </div>
            <Link className={styles.link} href="/">
              Fale Conosco
            </Link>
            <Link className={styles.link} href="/">
              Sobre
            </Link>
          </div>
          <div className={styles.rightItems}>
            <button type="button" className={styles.userIcon}>
              <PersonFilled fontSize={32} />
            </button>
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
        </div>
      </header>
      <div className={styles.blueBarContainer}>
        <div className={styles.blueBarLinks}>
          <Link href="">
            <PinFilled fontSize={20} />
            Promoçoes
          </Link>
          <Link href="/lancamentos">
            <NewFilled fontSize={20} />
            Lançamentos
          </Link>
          <Link href="/">
            <GiftFilled fontSize={20} />
            Presentes
          </Link>
          <Link href="/">
            <BriefcaseFilled fontSize={20} />
            Kits
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeaderMenu;
