'use client';

import Image from 'next/image';
import Link from 'next/link';
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
      </div>
      <Image
        className={styles.heroImage}
        priority={true}
        src="/images/homeHeroImageMobile.png"
        alt="imagem miniatura do produto"
        width={293}
        height={256}
      />
      <div className={styles.lancamentos}>
        <div className={styles.sectionTitleContainer}>
          <h2>Confira Os Nossos Lançamentos</h2>
          <div className={styles.marker} />
        </div>
        <p>
          Descubra nossas novidades mais reluzentes! Na Acme, estamos empolgados
          em apresentar as mais recentes adições à nossa coleção de joias.
        </p>
        <Link
          href="/lancamentos"
          className={`btnEnter btnPrimary ${styles.sectionLink}`}
        >
          Ver Lançamentos
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
