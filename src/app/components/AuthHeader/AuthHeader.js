'use client';

import Image from 'next/image';

import { ArrowLeftFilled } from '@fluentui/react-icons';
import Link from 'next/link';
import logoImg from '../../../../public/images/logoAuth.svg';
import styles from './AuthHeader.module.css';

function AuthHeader() {
  return (
    <header className={styles.authHeader}>
      <Link href="/" className={styles.backButtonLink}>
        <ArrowLeftFilled fontSize={28} />
      </Link>
      <Image priority={true} src={logoImg} alt="Logo Acme" />
    </header>
  );
}

export default AuthHeader;
