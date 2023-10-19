'use client';

import { CgSpinner } from 'react-icons/cg';
import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/userContext';
import withAuthRoute from '@/hoc/withAuthRoute';
import { toast } from 'react-toastify';

function Cadastro() {
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [celular, setCelular] = useState('');

  const { register } = useUser();

  function handleCelularChange(e) {
    const notDigitRegex = /\D/g; // Matches any character that is not a digit character (0-9)
    // Remove any character that is not a digit
    const value = e.target.value.replace(notDigitRegex, '');
    setCelular(value);
  }

  async function handleRegister(e) {
    e.preventDefault();
    setIsSendingForm(true);

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const { username, email, password, confirm_password, data_nasc } = formJson;

    if (password === confirm_password) {
      await register({
        username,
        email,
        password,
        data_nasc,
        celular,
      });
    } else {
      toast.error('Erro: as senhas inseridas não são iguais.');
    }

    setIsSendingForm(false);
  }

  return (
    <form onSubmit={handleRegister} className="authForm">
      <h1>Deseja ficar por dentro?</h1>
      <p>Crie uma conta para poder ter acesso completo ao site.</p>
      <label htmlFor="username">Nome Completo:</label>
      <input
        required
        minLength={3}
        autoComplete="name"
        type="text"
        name="username"
        id="username"
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
        value={celular}
        onChange={handleCelularChange}
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
