'use client';

import { useUser } from '@/contexts/userContext';
import styles from './homepage.module.css';

function Homepage() {
  const { user, logOut } = useUser();

  function handleLogout() {
    logOut();
  }

  return (
    <>
      <h1>{user && user.username}</h1>
      <button
        className={`btnPrimary ${styles.btnLogout}`}
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
}

export default Homepage;
