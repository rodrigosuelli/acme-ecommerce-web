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
} from '@fluentui/react-icons';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import { useUser } from '../../../contexts/userContext';

function Sidebar({ isSidebarVisible, setIsSidebarVisible, onMenuToggle }) {
  const { user, logOut } = useUser();

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
          {user ? (
            <h2>Olá, {user.nome.split(' ')[0]}!</h2>
          ) : (
            <h2>Olá, anônimo</h2>
          )}
        </div>
        <button onClick={onMenuToggle} className="close-btn" type="button">
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
          Home
        </Link>
        {user && (
          <Link
            onClick={() => {
              setIsSidebarVisible(false);
            }}
            href="#"
            className={styles.link}
          >
            <PersonNoteFilled fontSize={24} />
            Minha Conta
          </Link>
        )}
        <Link
          onClick={() => {
            setIsSidebarVisible(false);
          }}
          href="#"
          className={styles.link}
        >
          <PinFilled fontSize={24} />
          Promoçoes
        </Link>
        <Link
          onClick={() => {
            setIsSidebarVisible(false);
          }}
          href="#"
          className={styles.link}
        >
          <NewFilled fontSize={24} />
          Lançamentos
        </Link>
        <Link
          onClick={() => {
            setIsSidebarVisible(false);
          }}
          href="#"
          className={styles.link}
        >
          <GiftFilled fontSize={24} />
          Presentes
        </Link>
        <Link
          onClick={() => {
            setIsSidebarVisible(false);
          }}
          href="#"
          className={styles.link}
        >
          <BriefcaseFilled fontSize={24} />
          Kits
        </Link>
        <Link
          onClick={() => {
            setIsSidebarVisible(false);
          }}
          href="#"
          className={styles.link}
        >
          <ChatMultipleFilled fontSize={24} />
          Fale Conosco
        </Link>
        <Link
          onClick={() => {
            setIsSidebarVisible(false);
          }}
          href="#"
          className={styles.link}
        >
          <InfoFilled fontSize={24} />
          Sobre
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
            Log out
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
              Login
            </Link>
            <Link
              onClick={() => {
                setIsSidebarVisible(false);
              }}
              href="/cadastro"
              className={styles.link}
            >
              <PersonAddFilled fontSize={24} />
              Cadastro
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
