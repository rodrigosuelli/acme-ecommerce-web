'use client';

import { CgSpinner } from 'react-icons/cg';
import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/userContext';
import withAuthRoute from '@/hoc/withAuthRoute';

function Cadastro() {
  const [isSendingForm, setIsSendingForm] = useState(false);

  const { register } = useUser();

  async function handleRegister(e) {
    e.preventDefault();
    setIsSendingForm(true);

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const { name, email, password, confirm_password, data_nasc, celular } =
      formJson;

    await register({
      name,
      email,
      password,
      confirm_password,
      data_nasc,
      celular,
    });

    setIsSendingForm(false);
  }

  return (
    <form onSubmit={handleRegister} className="authForm">
      <h1>Deseja ficar por dentro?</h1>
      <p>Crie uma conta para poder ter acesso completo ao site.</p>
      <label htmlFor="name">Nome Completo:</label>
      <input
        required
        minLength={3}
        autoComplete="name"
        type="text"
        name="name"
        id="name"
        placeholder="Insira seu nome completo..."
      />

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
        autoComplete="new-password"
        placeholder="Senha"
        type="password"
        name="password"
        id="password"
      />

      <label htmlFor="confirm_password">Confirmar Senha:</label>
      <input
        required
        minLength={6}
        autoComplete="new-password"
        placeholder="Digite novamente a senha..."
        type="password"
        name="confirm_password"
        id="confirm_password"
      />

      <label htmlFor="data_nasc">Data de nascimento:</label>
      <input
        required
        autoComplete="bday"
        type="date"
        name="data_nasc"
        id="data_nasc"
      />

      <label htmlFor="celular">N° de celular:</label>
      <input
        required
        autoComplete="tel-national"
        type="tel"
        name="celular"
        id="celular"
        placeholder="(__) _ ____-____"
        minLength={10}
        maxLength={11}
        pattern="^[1-9]{2}(?:[1-9]|9[0-9])[0-9]{3}[0-9]{4}$"
        title="(DDD) 9 9999-9999"
      />

      <button disabled={isSendingForm} className="btnEnter" type="submit">
        {isSendingForm ? <CgSpinner size={28} /> : 'Criar Conta'}
      </button>
      <p className="paragraphWithLink">
        Já possui uma conta?&nbsp;
        <Link href="/cadastro" className="textLink">
          Efetue o Login
        </Link>
      </p>
    </form>
  );
}

export default withAuthRoute(Cadastro);
