'use client';

import UserProvider from '@/contexts/userContext';

export default function Providers({ children }) {
  return <UserProvider>{children}</UserProvider>;
}
