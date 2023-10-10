'use client';

import { CgSpinner } from 'react-icons/cg';

import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/userContext';
import withAuthRoute from '@/hoc/withAuthRoute';

import styles from './login.module.css';

function Login() {
  const [isSendingForm, setIsSendingForm] = useState(false);

  const { logIn } = useUser();

  async function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const { email, password } = formJson;

    await logIn(email, password);
  }

  return (
    <div className={styles.authPageContainer}>
      <div className={styles.formWrapper}>
        <form onSubmit={handleLogin} className={styles.authForm}>
          <h1>Bem-vindo!</h1>
          <p>Efetue o login para acessar nossa plataforma.</p>
          <label htmlFor="email">Email:</label>
          <input
            required
            minLength={6}
            autoComplete="email"
            type="email"
            name="email"
            id="email"
            placeholder="Insira seu email aqui..."
          />
          <label htmlFor="password">Senha:</label>
          <input
            required
            minLength={6}
            autoComplete="current-password"
            placeholder="Senha"
            type="password"
            name="password"
            id="password"
          />
          <button
            disabled={isSendingForm}
            className={styles.btnEnter}
            type="submit"
          >
            {isSendingForm ? <CgSpinner size={28} /> : 'Efetuar Login'}
          </button>
          <Link href="/esqueci-senha" className="textLink">
            Esqueceu a senha?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default withAuthRoute(Login);
