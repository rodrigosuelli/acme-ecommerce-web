'use client';

import { CgSpinner } from 'react-icons/cg';
import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/userContext';
import withAuthRoute from '@/hoc/withAuthRoute';
import { toast } from 'react-toastify';
import { InputMask } from '@react-input/mask';
import InputPassword from '../../components/InputPassword/InputPassword';

import styles from './cadastro.module.css';

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
    <form onSubmit={handleRegister} className={styles.authForm}>
      <h1>Deseja ficar por dentro?</h1>
      <p>Crie uma conta para poder ter acesso completo ao site.</p>
      <div className={styles.gridContainer}>
        <div className={styles.inputRow}>
          <label htmlFor="nome">Nome Completo:</label>
          <input
            className="inputDefault"
            required
            minLength={3}
            autoComplete="name"
            type="text"
            name="nome"
            id="nome"
            placeholder="Insira seu nome completo..."
          />
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="email">Email:</label>
          <input
            className="inputDefault"
            required
            minLength={6}
            autoComplete="email"
            type="email"
            name="email"
            id="email"
            placeholder="Insira seu email..."
          />
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="password">Senha:</label>
          <InputPassword
            autoComplete="new-password"
            placeholder="Senha"
            name="password"
            id="password"
          />
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="confirm_password">Confirmar Senha:</label>
          <InputPassword
            autoComplete="new-password"
            placeholder="Digite novamente a senha..."
            name="confirm_password"
            id="confirm_password"
          />
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="data_nasc">Data de nascimento:</label>
          <InputMask
            className="inputDefault"
            required
            name="data_nasc"
            placeholder="dd/mm/aaaa"
            id="data_nasc"
            title="Insira uma data válida no formato: dd/mm/aaaa"
            mask="ab/cd/ebbb"
            pattern="^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$"
            replacement={{
              a: /[0-3]/,
              b: /[0-9]/,
              c: /[0-1]/,
              d: /[0-9]/,
              e: /[1-2]/,
            }}
          />
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="celular">N° de celular:</label>
          <InputMask
            className="inputDefault"
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
        </div>
      </div>
      <button
        disabled={isSendingForm}
        className="btnPrimary btnEnterAuth"
        type="submit"
      >
        {isSendingForm ? <CgSpinner size={26} /> : 'Criar Conta'}
      </button>
      <p className="paragraphWithLink">
        Já possui uma conta?&nbsp;
        <Link href="/login" className="textLink">
          Efetue o Login
        </Link>
      </p>
    </form>
  );
}

export default withAuthRoute(Cadastro);
