'use client';

import qs from 'qs';

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
import useSWR from 'swr';
import { useCart } from '../../contexts/cartContext';

import styles from './HeaderMenu.module.css';
import Sidebar from './Sidebar/Sidebar';
import SearchMobile from './SearchMobile/SearchMobile';

import logoImg from '../../../../public/images/logo.svg';
import api from '../../services/api';

const query = qs.stringify(
  {
    filters: {
      tipo: {
        $eq: 'categoria_produto',
      },
    },
    fields: ['id', 'titulo', 'slug'],
    sort: ['titulo:asc'],
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

const fetcher = (url) => api.get(url).then((res) => res.data);

function HeaderMenu() {
  const { cart } = useCart();

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const { data, error, isLoading } = useSWR(
    `/api/categorias/?${query}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(
    data?.data ? data.data.length : 1
  );

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
                {error && (
                  <div>
                    <span>Ocorreu um erro...</span>
                  </div>
                )}
                {isLoading && (
                  <div>
                    <span>Carregando...</span>
                  </div>
                )}
                {data?.data &&
                  data.data.map((categoria, index) => (
                    <Link
                      key={categoria.id}
                      {...itemProps[index]}
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      href={`/${categoria.attributes.slug}`}
                    >
                      {categoria.attributes.titulo}
                    </Link>
                  ))}
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
            categoriasData={data}
            categoriasError={error}
            categoriasLoading={isLoading}
          />
          <SearchMobile
            isSearchVisible={isSearchVisible}
            setIsSearchVisible={setIsSearchVisible}
          />
        </div>
      </header>
      <div className={styles.blueBarContainer}>
        <div className={styles.blueBarLinks}>
          <Link href="/promocoes">
            <PinFilled fontSize={20} />
            Promoções
          </Link>
          <Link href="/lancamentos">
            <NewFilled fontSize={20} />
            Lançamentos
          </Link>
          <Link href="/presentes">
            <GiftFilled fontSize={20} />
            Presentes
          </Link>
          <Link href="/kits">
            <BriefcaseFilled fontSize={20} />
            Kits
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeaderMenu;
