'use client';

import { CgSpinner } from 'react-icons/cg';
import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/userContext';
import withAuthRoute from '@/hoc/withAuthRoute';
import { toast } from 'react-toastify';
import { InputMask } from '@react-input/mask';

function Cadastro() {
  const [isSendingForm, setIsSendingForm] = useState(false);

  const { register } = useUser();

  async function handleRegister(e) {
    e.preventDefault();
    setIsSendingForm(true);

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const { nome, email, password, confirm_password, data_nasc, celular } =
      formJson;

    const celularValidado = celular.replace(/\D/g, ''); // Replace all leading non-digits with nothing

    console.log(data_nasc);

    if (password === confirm_password) {
      await register({
        nome,
        email,
        password,
        data_nasc,
        celular: celularValidado,
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
      <label htmlFor="nome">Nome Completo:</label>
      <input
        required
        minLength={3}
        autoComplete="name"
        type="text"
        name="nome"
        id="nome"
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
      <InputMask
        required
        autoComplete="bday"
        name="data_nasc"
        placeholder="__/__/____"
        id="data_nasc"
        mask="dd/mm/yyyy"
        replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
      />
      <label htmlFor="celular">N° de celular:</label>
      <InputMask
        required
        autoComplete="tel-national"
        name="celular"
        id="celular"
        placeholder="(__) _ ____-____"
        title="Insira um número válido no formato: (DDD) 9 9999-9999"
        pattern="^\([1-9]{2}\) 9 [0-9]{4}-[0-9]{4}$"
        mask="(aa) b cccc-cccc"
        replacement={{ a: /[1-9]/, b: /9/, c: /[0-9]/ }}
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
