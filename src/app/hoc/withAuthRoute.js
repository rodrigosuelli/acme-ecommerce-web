import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/contexts/userContext';

const withAuthRoute = (Component) => {
  const AuthRoute = (props) => {
    const { loadingUser, user } = useUser();

    const router = useRouter();

    const isLoggedIn = !loadingUser && user;

    // Prefetch the home page
    useEffect(() => {
      router.prefetch('/');
    }, [router]);

    // If is logged in redirect to /
    useEffect(() => {
      if (isLoggedIn) {
        router.push('/');
      }
    }, [isLoggedIn, router]);

    // If user is logged out, return original component
    return <Component {...props} />;
  };

  // Copy and run getInitialProps if exists
  // if (Component.getInitialProps) {
  // Auth.getInitialProps = Component.getInitialProps;
  // }

  return AuthRoute;
};

export default withAuthRoute;
