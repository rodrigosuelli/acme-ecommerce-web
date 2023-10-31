'use client';

import { DismissFilled, SearchFilled } from '@fluentui/react-icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './SearchMobile.module.css';

function SearchMobile({ isSearchVisible, handleToggleSearch }) {
  const [search, setSearch] = useState('');

  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();

    router.push(`/produtos?busca=${search}`);

    setSearch('');

    handleToggleSearch();
  }

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
        <form onSubmit={handleSearch}>
          <div className={styles.searchInputField}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
              className="inputDefault"
              placeholder="Faça sua busca"
              type="text"
              name="search"
              id="search"
            />
            <button type="submit">
              <SearchFilled fontSize={24} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchMobile;
