'use client';

import {
  DismissFilled,
  PersonFilled,
  PersonNoteFilled,
  HomeFilled,
  SignOutFilled,
  PinFilled,
  InfoFilled,
  NewFilled,
  GiftFilled,
  BriefcaseFilled,
  ChatMultipleFilled,
  KeyFilled,
  PersonAddFilled,
  ChevronDownFilled,
  AppsListFilled,
  ChevronUpFilled,
} from '@fluentui/react-icons';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Sidebar.module.css';
import { useUser } from '../../../contexts/userContext';

function Sidebar({
  isSidebarVisible,
  setIsSidebarVisible,
  categoriasData,
  categoriasError,
  categoriasLoading,
}) {
  const { user, loadingUser, logOut } = useUser();

  const [isMinhaContaExpanded, setIsMinhaContaExpanded] = useState(true);
  const [isCategoriasExpanded, setIsCategoriasExpanded] = useState(false);

  return (
    <aside
      className={
        isSidebarVisible
          ? `${styles.sidebar} ${styles.visible}`
          : styles.sidebar
      }
    >
      <div className={styles.brand}>
        <div className={styles.userInfo}>
          <PersonFilled fontSize={24} />
          <h2>
            {loadingUser && !user && 'Carregando...'}

            {!loadingUser && user && `Olá, ${user.nome.split(' ')[0]}!`}

            {!loadingUser && !user && 'Olá, anônimo'}
          </h2>
        </div>
        <button onClick={() => setIsSidebarVisible(false)} type="button">
          <DismissFilled fontSize={24} />
        </button>
      </div>
      <div className={styles.linksContainer}>
        <Link
          onClick={() => {
            setIsSidebarVisible(false);
          }}
          href="/"
          className={styles.link}
        >
          <HomeFilled fontSize={24} />
          <span>Home</span>
        </Link>
        {user && (
          <>
            <button
              type="button"
              onClick={() => {
                setIsMinhaContaExpanded(!isMinhaContaExpanded);
              }}
              className={`${styles.link} ${
                isMinhaContaExpanded && styles.fatherLink
              }`}
            >
              <PersonNoteFilled fontSize={24} />
              <span>Minha Conta</span>
              {isMinhaContaExpanded ? (
                <ChevronUpFilled fontSize={22} />
              ) : (
                <ChevronDownFilled fontSize={22} />
              )}
            </button>
            {isMinhaContaExpanded && (
              <div className={styles.sublinksContainer}>
                <Link
                  onClick={() => {
                    setIsSidebarVisible(false);
                  }}
                  href="#"
                  className={styles.link}
                >
                  <span>Meu Perfil</span>
                </Link>
                <Link
                  onClick={() => {
                    setIsSidebarVisible(false);
                  }}
                  href="/minha-conta/meus-pedidos"
                  className={styles.link}
                >
                  <span>Meus Pedidos</span>
                </Link>
              </div>
            )}
          </>
        )}
        <button
          type="button"
          onClick={() => {
            setIsCategoriasExpanded(!isCategoriasExpanded);
          }}
          className={`${styles.link} ${
            isCategoriasExpanded && styles.fatherLink
          }`}
        >
          <AppsListFilled fontSize={24} />
          <span>Categorias</span>
          {isCategoriasExpanded ? (
            <ChevronUpFilled fontSize={22} />
          ) : (
            <ChevronDownFilled fontSize={22} />
          )}
        </button>
        {isCategoriasExpanded && (
          <div className={styles.sublinksContainer}>
            {categoriasError && (
              <div className={styles.link}>
                <span>Ocorreu um erro...</span>
              </div>
            )}
            {categoriasLoading && (
              <div className={styles.link}>
                <span>Carregando...</span>
              </div>
            )}
            {categoriasData?.data &&
              categoriasData.data.map((categoria) => (
                <Link
                  key={categoria.id}
                  onClick={() => {
                    setIsSidebarVisible(false);
                  }}
                  href={`/${categoria.attributes.slug}`}
                  className={styles.link}
                >
                  <span>{categoria.attributes.titulo}</span>
                </Link>
              ))}
          </div>
        )}
        <Link
          onClick={() => {
            setIsSidebarVisible(false);
          }}
          href="#"
          className={styles.link}
        >
          <PinFilled fontSize={24} />
          <span>Promoçoes</span>
        </Link>
        <Link
          onClick={() => {
            setIsSidebarVisible(false);
          }}
          href="/lancamentos"
          className={styles.link}
        >
          <NewFilled fontSize={24} />
          <span>Lançamentos</span>
        </Link>
        <Link
          onClick={() => {
            setIsSidebarVisible(false);
          }}
          href="#"
          className={styles.link}
        >
          <GiftFilled fontSize={24} />
          <span>Presentes</span>
        </Link>
        <Link
          onClick={() => {
            setIsSidebarVisible(false);
          }}
          href="#"
          className={styles.link}
        >
          <BriefcaseFilled fontSize={24} />
          <span>Kits</span>
        </Link>
        <Link
          onClick={() => {
            setIsSidebarVisible(false);
          }}
          href="#"
          className={styles.link}
        >
          <ChatMultipleFilled fontSize={24} />
          <span>Fale Conosco</span>
        </Link>
        <Link
          onClick={() => {
            setIsSidebarVisible(false);
          }}
          href="#"
          className={styles.link}
        >
          <InfoFilled fontSize={24} />
          <span>Sobre</span>
        </Link>
        {user ? (
          <button
            type="button"
            onClick={() => {
              logOut();
              setIsSidebarVisible(false);
            }}
            className={styles.link}
          >
            <SignOutFilled fontSize={24} />
            <span>Log out</span>
          </button>
        ) : (
          <>
            <Link
              onClick={() => {
                setIsSidebarVisible(false);
              }}
              href="/login"
              className={styles.link}
            >
              <KeyFilled fontSize={24} />
              <span>Login</span>
            </Link>
            <Link
              onClick={() => {
                setIsSidebarVisible(false);
              }}
              href="/cadastro"
              className={styles.link}
            >
              <PersonAddFilled fontSize={24} />
              <span>Cadastro</span>
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
