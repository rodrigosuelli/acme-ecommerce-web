'use client';

import { DismissFilled, SearchFilled } from '@fluentui/react-icons';
import styles from './SearchMobile.module.css';

function SearchMobile({ isSearchVisible, handleToggleSearch }) {
  return (
    <div
      className={
        isSearchVisible
          ? `${styles.searchMobileContainer} ${styles.visible}`
          : styles.searchMobileContainer
      }
    >
      <div className={styles.contentWrapper}>
        <div className={styles.searchTitleContainer}>
          <h1>O que você procura?</h1>
          <button onClick={handleToggleSearch} type="button">
            <DismissFilled fontSize={24} />
          </button>
        </div>
        <div className={styles.searchInputField}>
          <input
            className="inputDefault"
            placeholder="Faça sua busca"
            type="text"
            name="search"
            id="search"
          />
          <button type="button">
            <SearchFilled fontSize={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchMobile;
