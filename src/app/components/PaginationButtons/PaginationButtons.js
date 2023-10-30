'use client';

import Link from 'next/link';
import { ChevronLeftFilled, ChevronRightFilled } from '@fluentui/react-icons';
import styles from './PaginationButtons.module.css';

function LinkList({ currentPage, pageCount }) {
  const contentToRender = [];

  for (let i = 1; i <= pageCount; i++) {
    contentToRender.push(
      <Link
        key={i}
        className={`${styles.pagLink} ${currentPage === i && styles.current}`}
        href={`?page=${i}`}
      >
        {i}
      </Link>
    );
  }

  return contentToRender;
}

function PaginationButtons({ currentPage, pageCount }) {
  return (
    <div className={styles.pagButtonsContainer}>
      <Link
        className={`${styles.pagLink} ${styles.icon}`}
        href={currentPage > 1 ? `?page=${currentPage - 1}` : ''}
      >
        <ChevronLeftFilled fontSize={17} />
      </Link>
      <div className={styles.pagLinksContainer}>
        <LinkList currentPage={currentPage} pageCount={pageCount} />
      </div>
      <Link
        className={`${styles.pagLink} ${styles.icon}`}
        href={currentPage < pageCount ? `?page=${currentPage + 1}` : ''}
      >
        <ChevronRightFilled fontSize={17} />
      </Link>
    </div>
  );
}

export default PaginationButtons;
