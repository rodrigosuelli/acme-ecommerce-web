'use client';

import { useUser } from '@/contexts/userContext';
import styles from './homepage.module.css';

function Homepage() {
  const { user, logOut } = useUser();

  function handleLogout() {
    logOut();
  }

  return (
    <div className={styles.homepageContainer}>
      <h1>{user && user.username}</h1>
      <button className={styles.btnLogout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Homepage;
