import { Fredoka } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import Providers from './providers';

import './globals.css';
import 'react-toastify/dist/ReactToastify.min.css';

const fredoka = Fredoka({ subsets: ['latin'] });

export const metadata = {
  title: 'Acme',
  description: 'Painel de controle da Acme',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={fredoka.className}>
        <Providers>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={6000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            theme="colored"
          />
        </Providers>
      </body>
    </html>
  );
}
