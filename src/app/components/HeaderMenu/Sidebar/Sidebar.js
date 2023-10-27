'use client';

import {
  DismissFilled,
  PersonFilled,
  PersonNoteFilled,
  HomeFilled,
} from '@fluentui/react-icons';
import Link from 'next/link';
import styles from './Sidebar.module.css';

function Sidebar({ isSidebarVisible, setIsSidebarVisible, onMenuToggle }) {
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
          <h2>Olá, Marcelo!</h2>
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
      </div>
    </aside>
  );
}

export default Sidebar;
