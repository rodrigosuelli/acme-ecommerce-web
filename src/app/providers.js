'use client';

import UserProvider from '@/contexts/userContext';
import CartProvider from '@/contexts/cartContext';
import { useIsClient } from '@uidotdev/usehooks';

export default function Providers({ children }) {
  const isClient = useIsClient();

  if (isClient === false) {
    return false;
  }

  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  );
}
