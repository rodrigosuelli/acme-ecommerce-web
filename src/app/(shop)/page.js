'use client';

import Image from 'next/image';
import styles from './homepage.module.css';

function Homepage() {
  return (
    <div className={`shopPage ${styles.homePage}`}>
      <div className={styles.homeContainer}>
        <h1 className={styles.heroTitle}>Abrace o Luxo em Cada Detalhe!</h1>
        <p>
          Não espere mais! Explore agora mesmo nossa emocionante coleção de
          lançamentos e descubra o que há de mais recente em semijoias.
        </p>
        <Image
          className={styles.heroImage}
          priority={true}
          src="/images/homeHeroImageMobile.png"
          alt="imagem miniatura do produto"
          width={293}
          height={256}
        />
      </div>
    </div>
  );
}

export default Homepage;
