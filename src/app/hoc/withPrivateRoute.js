import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '../contexts/userContext';

const withPrivateRoute = (Component) => {
  const PrivateRoute = (props) => {
    const { loadingUser, user } = useUser();

    const router = useRouter();

    const isLoggedOut = !loadingUser && !user;

    // Prefetch login page
    useEffect(() => {
      router.prefetch('/login');
    }, [router]);

    // If is logged out redirect to /login
    useEffect(() => {
      if (isLoggedOut) {
        router.push('/login');
      }
    }, [isLoggedOut, router]);

    // If is Loading or not logged in, return loading component
    if (loadingUser || !user) {
      return <h1>Loading...</h1>;
    }

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy and run getInitialProps if exists
  // if (Component.getInitialProps) {
  // Auth.getInitialProps = Component.getInitialProps;
  // }

  return PrivateRoute;
};

export default withPrivateRoute;
