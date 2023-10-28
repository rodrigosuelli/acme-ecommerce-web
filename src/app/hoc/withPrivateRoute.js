import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/contexts/userContext';
import { CgSpinner } from 'react-icons/cg';
import { toast } from 'react-toastify';

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
        toast.error(
          'Erro: você precisa estar logado para acessar essa página.'
        );
        router.push('/login');
      }
    }, [isLoggedOut, router]);

    // If is Loading or not logged in, return loading component
    if (loadingUser || !user) {
      return (
        <div className="loadingProdutoPage">
          <CgSpinner className="spinner" size={36} />
        </div>
      );
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
