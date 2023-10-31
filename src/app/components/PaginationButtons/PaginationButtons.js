'use client';

import Link from 'next/link';
import { ChevronLeftFilled, ChevronRightFilled } from '@fluentui/react-icons';
import styles from './PaginationButtons.module.css';

function LinkList({ currentPage, pageCount, buscaString }) {
  const contentToRender = [];

  for (let i = 1; i <= pageCount; i++) {
    contentToRender.push(
      <Link
        key={i}
        className={`${styles.pagLink} ${currentPage === i && styles.current}`}
        href={buscaString !== '' ? `${buscaString}&page=${i}` : `?page=${i}`}
      >
        {i}
      </Link>
    );
  }

  return contentToRender;
}

function PaginationButtons({ currentPage, pageCount, busca = '' }) {
  const isBuscaNotEmpty = busca !== '';
  const buscaString = isBuscaNotEmpty ? `?busca=${busca}` : '';

  let hrefPrevPageBase = currentPage > 1 ? `?page=${currentPage - 1}` : '';
  let hrefNextPageBase =
    currentPage < pageCount ? `?page=${currentPage + 1}` : '';

  if (isBuscaNotEmpty) {
    hrefPrevPageBase =
      currentPage > 1 ? `${buscaString}&page=${currentPage - 1}` : '';
    hrefNextPageBase =
      currentPage < pageCount ? `${buscaString}&page=${currentPage + 1}` : '';
  }

  return (
    <div className={styles.pagButtonsContainer}>
      <Link
        className={`${styles.pagLink} ${styles.icon}`}
        href={hrefPrevPageBase}
      >
        <ChevronLeftFilled fontSize={17} />
      </Link>
      <div className={styles.pagLinksContainer}>
        <LinkList
          currentPage={currentPage}
          pageCount={pageCount}
          buscaString={buscaString}
        />
      </div>
      <Link
        className={`${styles.pagLink} ${styles.icon}`}
        href={hrefNextPageBase}
      >
        <ChevronRightFilled fontSize={17} />
      </Link>
    </div>
  );
}

export default PaginationButtons;
