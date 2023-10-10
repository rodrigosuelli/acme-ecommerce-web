'use client';

import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { useUser } from '@/contexts/userContext';
import styles from './dashboard.module.css';

function Dashboard() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { logOut } = useUser();

  async function handleLogout() {
    setIsLoggingOut(true);
    await logOut();
    setIsLoggingOut(false);
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1>Dashboard Page</h1>
      <button
        disabled={isLoggingOut}
        className={styles.btnLogout}
        onClick={handleLogout}
      >
        {isLoggingOut ? <CgSpinner size={28} /> : 'Logout'}
      </button>
    </div>
  );
}

export default Dashboard;
