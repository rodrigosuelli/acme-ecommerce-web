'use client';

import Image from 'next/image';

import { NavigationFilled } from '@fluentui/react-icons';
import Link from 'next/link';
import logoImg from '../../../public/images/logo.svg';
import styles from './HeaderMenu.module.css';

function HeaderMenu() {
  return (
    <header className={styles.authHeader}>
      <Link href="/" className={styles.backButtonLink}>
        <NavigationFilled fontSize={28} />
      </Link>
      <Image priority={true} src={logoImg} alt="Logo Acme" />
    </header>
  );
}

export default HeaderMenu;
