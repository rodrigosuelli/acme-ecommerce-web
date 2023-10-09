import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import {
  confirmPasswordReset,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  verifyPasswordResetCode,
} from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import createFirebaseApp from '../services/firebase/firebase';
import firebaseErrorsPTBR from '../services/firebase/firebaseErrorsPTBR.json';

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.
  const [firebaseStatusMessage, setFirebaseStatusMessage] = useState(null); // Error or success message

  const app = createFirebaseApp();
  const auth = getAuth(app);
  const db = getFirestore(app);

  auth.languageCode = 'pt-BR'; // language used in emails, sms, etc

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = onAuthStateChanged(auth, async (userAcc) => {
      try {
        if (userAcc) {
          // User is signed in.
          const { uid, displayName, email, photoURL } = userAcc;
          const docRef = doc(db, 'users', uid);
          const userDoc = await getDoc(docRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const { role } = userData;
            setUser({ uid, displayName, email, photoURL, role });
          } else {
            setUser(null);
            throw new Error('Documento não encontrado no Firestore');
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        if (error.code === 'permission-denied') {
          setFirebaseStatusMessage({
            type: 'error',
            message: `Você não possui permissão para acessar esses dados no firestore. (${error.code}).`,
          });
        } else {
          // Most probably a connection error. Handle appropriately.
          setFirebaseStatusMessage({ type: 'error', message: error.message });
        }
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, [auth, db]);

  // Display toast messages dynamically based on type (error, success, etc)
  useEffect(() => {
    if (firebaseStatusMessage) {
      const { type, message } = firebaseStatusMessage;
      toast[type](message);
    }
  }, [firebaseStatusMessage]);

  const logIn = useCallback(
    async (email, password) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setFirebaseStatusMessage({
          type: 'success',
          message: 'Login realizado com sucesso.',
        });
      } catch (error) {
        setFirebaseStatusMessage({
          type: 'error',
          message: firebaseErrorsPTBR[error.code]
            ? `${firebaseErrorsPTBR[error.code]} (${error.code}).`
            : error.message,
        });
        if (error.code === 'auth/user-not-found') {
          setFirebaseStatusMessage({
            type: 'error',
            message: firebaseErrorsPTBR[error.code]
              ? `${firebaseErrorsPTBR[error.code]} (${error.code}).`
              : error.message,
          });
        } else if (error.code === 'auth/wrong-password') {
          setFirebaseStatusMessage({
            type: 'error',
            message: firebaseErrorsPTBR[error.code]
              ? `${firebaseErrorsPTBR[error.code]} (${error.code}).`
              : error.message,
          });
        } else {
          setFirebaseStatusMessage({
            type: 'error',
            message: firebaseErrorsPTBR[error.code]
              ? `${firebaseErrorsPTBR[error.code]} (${error.code}).`
              : error.message,
          });
          throw error;
        }
      }
    },
    [auth]
  );

  const logOut = useCallback(async () => {
    try {
      await signOut(auth);
      setFirebaseStatusMessage({
        type: 'success',
        message: 'Deslogado com sucesso.',
      });
    } catch (error) {
      setFirebaseStatusMessage({
        type: 'error',
        message: firebaseErrorsPTBR[error.code]
          ? `${firebaseErrorsPTBR[error.code]} (${error.code}).`
          : error.message,
      });
    }
  }, [auth]);

  const enviarEmailRedefinirSenha = useCallback(
    async (email) => {
      try {
        await sendPasswordResetEmail(auth, email);
        setFirebaseStatusMessage({
          type: 'success',
          message: 'Email de redefinição de senha enviado com sucesso.',
        });
      } catch (error) {
        setFirebaseStatusMessage({
          type: 'error',
          message: firebaseErrorsPTBR[error.code]
            ? `${firebaseErrorsPTBR[error.code]} (${error.code}).`
            : error.message,
        });
        throw error;
      }
    },
    [auth]
  );

  const verificarCodRedefinicaoSenha = useCallback(
    async (actionCode) => {
      try {
        // Verifica se o codigo de redefinicao de senha é valido e retorna o email do usuario
        const userEmail = await verifyPasswordResetCode(auth, actionCode);
        return userEmail;
      } catch (error) {
        setFirebaseStatusMessage({
          type: 'error',
          message: firebaseErrorsPTBR[error.code]
            ? `${firebaseErrorsPTBR[error.code]} (${error.code}).`
            : error.message,
        });
        throw error;
      }
    },
    [auth]
  );

  const confirmarRedefinicaoSenha = useCallback(
    async (actionCode, newPassword) => {
      try {
        await confirmPasswordReset(auth, actionCode, newPassword);
        setFirebaseStatusMessage({
          type: 'success',
          message: 'Senha redefinida com sucesso.',
        });
      } catch (error) {
        setFirebaseStatusMessage({
          type: 'error',
          message: firebaseErrorsPTBR[error.code]
            ? `${firebaseErrorsPTBR[error.code]} (${error.code}).`
            : error.message,
        });
        throw error;
      }
    },
    [auth]
  );

  const contextValue = useMemo(
    () => ({
      user,
      loadingUser,
      firebaseStatusMessage,
      logIn,
      logOut,
      enviarEmailRedefinirSenha,
      verificarCodRedefinicaoSenha,
      confirmarRedefinicaoSenha,
    }),
    [
      user,
      loadingUser,
      firebaseStatusMessage,
      logIn,
      logOut,
      enviarEmailRedefinirSenha,
      verificarCodRedefinicaoSenha,
      confirmarRedefinicaoSenha,
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
