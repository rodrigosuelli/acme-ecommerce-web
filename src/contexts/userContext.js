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
  const [firebaseStatusMessage, setFirebaseStatusMessage] = useState(null); // Error or success message

  // Display toast messages dynamically based on type (error, success, etc)
  useEffect(() => {
    if (firebaseStatusMessage) {
      const { type, message } = firebaseStatusMessage;
      toast[type](message);
    }
  }, [firebaseStatusMessage]);

  const logIn = useCallback(async (email, password) => {
    try {
      const data = { email, password };

      const response = await api.post('/api/auth/login', data);

      // storeTokens(response.data);

      // setAuthenticated(true);
      console.log(response.data);
      setUser(response.data.user);
      console.log(user);

      setFirebaseStatusMessage({
        type: 'success',
        message: 'Login realizado com sucesso.',
      });
    } catch (error) {
      setFirebaseStatusMessage({
        type: 'error',
        message: error.message,
      });

      console.log(error);

      // throw error;
    }
  }, []);

  // const logOut = useCallback(async () => {
  //   try {
  //     await signOut(auth);
  //     setFirebaseStatusMessage({
  //       type: 'success',
  //       message: 'Deslogado com sucesso.',
  //     });
  //   } catch (error) {
  //     setFirebaseStatusMessage({
  //       type: 'error',
  //       message: firebaseErrorsPTBR[error.code]
  //         ? `${firebaseErrorsPTBR[error.code]} (${error.code}).`
  //         : error.message,
  //     });
  //   }
  // }, [auth]);

  // const enviarEmailRedefinirSenha = useCallback(
  //   async (email) => {
  //     try {
  //       await sendPasswordResetEmail(auth, email);
  //       setFirebaseStatusMessage({
  //         type: 'success',
  //         message: 'Email de redefinição de senha enviado com sucesso.',
  //       });
  //     } catch (error) {
  //       setFirebaseStatusMessage({
  //         type: 'error',
  //         message: firebaseErrorsPTBR[error.code]
  //           ? `${firebaseErrorsPTBR[error.code]} (${error.code}).`
  //           : error.message,
  //       });
  //       throw error;
  //     }
  //   },
  //   [auth]
  // );

  // const verificarCodRedefinicaoSenha = useCallback(
  //   async (actionCode) => {
  //     try {
  //       // Verifica se o codigo de redefinicao de senha é valido e retorna o email do usuario
  //       const userEmail = await verifyPasswordResetCode(auth, actionCode);
  //       return userEmail;
  //     } catch (error) {
  //       setFirebaseStatusMessage({
  //         type: 'error',
  //         message: firebaseErrorsPTBR[error.code]
  //           ? `${firebaseErrorsPTBR[error.code]} (${error.code}).`
  //           : error.message,
  //       });
  //       throw error;
  //     }
  //   },
  //   [auth]
  // );

  // const confirmarRedefinicaoSenha = useCallback(
  //   async (actionCode, newPassword) => {
  //     try {
  //       await confirmPasswordReset(auth, actionCode, newPassword);
  //       setFirebaseStatusMessage({
  //         type: 'success',
  //         message: 'Senha redefinida com sucesso.',
  //       });
  //     } catch (error) {
  //       setFirebaseStatusMessage({
  //         type: 'error',
  //         message: firebaseErrorsPTBR[error.code]
  //           ? `${firebaseErrorsPTBR[error.code]} (${error.code}).`
  //           : error.message,
  //       });
  //       throw error;
  //     }
  //   },
  //   [auth]
  // );

  const contextValue = useMemo(
    () => ({
      user,
      loadingUser,
      firebaseStatusMessage,
      logIn,
      // logOut,
      // enviarEmailRedefinirSenha,
      // verificarCodRedefinicaoSenha,
      // confirmarRedefinicaoSenha,
    }),
    [
      user,
      loadingUser,
      firebaseStatusMessage,
      logIn,
      // logOut,
      // enviarEmailRedefinirSenha,
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
