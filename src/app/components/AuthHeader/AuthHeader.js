'use client';

import Image from 'next/image';

import { ArrowLeftFilled } from '@fluentui/react-icons';
import Link from 'next/link';
import styles from './AuthHeader.module.css';

function AuthHeader() {
  return (
    <header className={styles.authHeader}>
      <Link href="/" className={styles.backButtonLink}>
        <ArrowLeftFilled fontSize={28} />
      </Link>
      <Image
        priority={true}
        src="/images/logoAuth.svg"
        alt="Logo Acme"
        width={91}
        height={30}
      />
    </header>
  );
}

export default AuthHeader;
