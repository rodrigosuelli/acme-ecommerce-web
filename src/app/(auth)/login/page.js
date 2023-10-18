'use client';

import { CgSpinner } from 'react-icons/cg';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/contexts/userContext';
import withAuthRoute from '@/hoc/withAuthRoute';

import { ArrowLeftFilled } from '@fluentui/react-icons';
import logo from '../../../../public/images/logo.svg';

function Login() {
  const [isSendingForm, setIsSendingForm] = useState(false);

  const { logIn } = useUser();

  async function handleLogin(e) {
    e.preventDefault();
    setIsSendingForm(true);

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const { email, password } = formJson;

    await logIn(email, password);

    setIsSendingForm(false);
  }

  return (
    <div className="authPageContainer">
      <header className="authHeader">
        <ArrowLeftFilled fontSize={28} />
        <Image priority={true} src={logo} alt="Logo Acme" />
      </header>
      <form onSubmit={handleLogin} className="authForm">
        <h1>Bem-vindo de volta</h1>
        <p>Efetue o login para ter uma melhor experiência.</p>
        <label htmlFor="email">Email:</label>
        <input
          required
          minLength={6}
          autoComplete="email"
          type="email"
          name="email"
          id="email"
          placeholder="Insira seu email..."
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
        <Link href="/esqueci-senha" className="textLink">
          Esqueceu a senha?
        </Link>
        <button disabled={isSendingForm} className="btnEnter" type="submit">
          {isSendingForm ? <CgSpinner size={28} /> : 'Login'}
        </button>
        <p className="paragraphWithLink">
          Não possui uma conta?&nbsp;
          <Link href="/criar-conta" className="textLink">
            Crie Uma
          </Link>
        </p>
      </form>
    </div>
  );
}

export default withAuthRoute(Login);
