import { Roboto_Flex, Merriweather } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import Providers from './providers';

import './globals.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-multi-carousel/lib/styles.css';

const roboto = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const merriweather = Merriweather({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

export const metadata = {
  title: 'Acme',
  description: 'Painel de controle da Acme',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${roboto.variable} ${merriweather.variable}`}
    >
      <body>
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
