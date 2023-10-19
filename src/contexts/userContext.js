import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from 'react';

import { toast } from 'react-toastify';
import api from '../services/api';

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.
  const [authStatusMessage, setAuthStatusMessage] = useState(null); // Error or success message

  useEffect(() => {
    // Add interceptopr
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        let errMessage;
        let errMessageType = 'error';

        if (error.response?.data.error.name === 'UnauthorizedError') {
          // if access token is invalid/expired, clear token and logout
          localStorage.removeItem('token');
          setUser(null);
          errMessageType = 'warn';
          errMessage = 'Sessão expirada, por favor faça login novamente.';
        } else {
          errMessage = error.response?.data
            ? `${error.response.data.error.message}. (${error.response.data.error.name}).`
            : `${error.message}. (${error.name}).`;
        }

        setAuthStatusMessage({
          type: errMessageType,
          message: errMessage,
        });

        return Promise.reject(error);
      },
      { synchronous: true }
    );

    let ignore = false;

    async function checkAuthenticated() {
      try {
        const storageToken = localStorage.getItem('token');

        if (storageToken) {
          api.defaults.headers.Authorization = `Bearer ${storageToken}`;

          const response = await api.get('/api/users/me');
          if (!ignore) {
            setUser(response.data);
          }
        }
      } catch (error) {
        // Let interceptor handle
      } finally {
        setLoadingUser(false);
      }
    }

    checkAuthenticated();

    return () => {
      ignore = true;
      api.interceptors.response.clear(); // clear all interceptors
    };
  }, []);

  // Display toast messages dynamically based on type (error, success, etc)
  useEffect(() => {
    if (authStatusMessage) {
      const { type, message } = authStatusMessage;
      toast[type](message);
    }
  }, [authStatusMessage]);

  function storeToken(accessToken) {
    localStorage.setItem('token', accessToken);

    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }

  const register = useCallback(
    async ({ nome, email, password, celular, data_nasc }) => {
      try {
        const data = { nome, email, password, celular, data_nasc };

        const response = await api.post('/api/auth/register', data);

        storeToken(response.data.jwt);

        setUser(response.data.user);

        setAuthStatusMessage({
          type: 'success',
          message: 'Cadastro realizado com sucesso.',
        });
      } catch (error) {
        // Let interceptor handle
      }
    },
    []
  );

  const logIn = useCallback(async (email, password) => {
    try {
      const data = { email, password };

      const response = await api.post('/api/auth/login', data);

      storeToken(response.data.jwt);

      setUser(response.data.user);

      setAuthStatusMessage({
        type: 'success',
        message: 'Login realizado com sucesso.',
      });
    } catch (error) {
      // Let interceptor handle
    }
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('token');

    api.defaults.headers.Authorization = undefined; // clear Auth header

    setUser(null);

    setAuthStatusMessage({
      type: 'success',
      message: 'Deslogado com sucesso.',
    });
  }, []);

  const forgotPassword = useCallback(async (email) => {
    try {
      const data = { email };

      await api.post('/api/auth/forgot-password', data);

      setAuthStatusMessage({
        type: 'success',
        message: 'Email de redefinição de senha enviado com sucesso.',
      });
    } catch (error) {
      // Let interceptor handle
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (code, password) => {
    try {
      const data = { code, password };

      const response = await api.post('/api/auth/reset-password', data);

      storeToken(response.data.jwt);

      setUser(response.data.user);

      setAuthStatusMessage({
        type: 'success',
        message: 'Senha redefinida com sucesso.',
      });
    } catch (error) {
      // Let interceptor handle
      throw error;
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      loadingUser,
      authStatusMessage,
      logIn,
      logOut,
      forgotPassword,
      resetPassword,
      register,
      // verificarCodRedefinicaoSenha,
      // confirmarRedefinicaoSenha,
    }),
    [
      user,
      loadingUser,
      authStatusMessage,
      logIn,
      logOut,
      forgotPassword,
      resetPassword,
      register,
      // verificarCodRedefinicaoSenha,
      // confirmarRedefinicaoSenha,
    ]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

// Custom hook that shorthands the context!
export function useUser() {
  return useContext(UserContext);
}
