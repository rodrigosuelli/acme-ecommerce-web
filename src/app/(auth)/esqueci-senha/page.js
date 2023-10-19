'use client';

import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

import Link from 'next/link';
import { useUser } from '@/contexts/userContext';

function EsqueciSenha() {
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const { forgotPassword } = useUser();

  const isEmailSentWithSuccess = !isSendingForm && isEmailSent;

  async function handleForgotPassword(e) {
    try {
      e.preventDefault();
      setIsSendingForm(true);

      const form = e.target;
      const formData = new FormData(form);
      const email = formData.get('email');

      await forgotPassword(email);

      setIsEmailSent(true);
    } catch (error) {
      // Let interceptor handle
    } finally {
      setIsSendingForm(false);
    }
  }

  return (
    <form onSubmit={handleForgotPassword} className="authForm">
      {isEmailSentWithSuccess ? (
        <>
          <h1>Email Enviado!</h1>
          <p>
            Acabamos de enviar um email para o endereço fornecido com as
            instruções necessárias para redefinir sua senha. Por favor,
            verifique sua caixa de entrada e também a pasta de spam caso não
            encontre nosso email imediatamente. Se precisar de mais assistência,
            nossa equipe de suporte está à disposição para ajudar.
          </p>
          <Link href="/login" className="btnEnter">
            Retornar para Login
          </Link>
        </>
      ) : (
        <>
          <h1>Esqueceu a senha?</h1>
          <p>
            Se você esqueceu sua senha, não se preocupe. Insira seu endereço de
            email abaixo para receber instruções sobre como redefinir sua senha
            e acessar sua conta. Verifique sua caixa de entrada e pasta de spam
            se não receber nosso email imediatamente.
          </p>
          <input
            required
            autoComplete="email"
            type="email"
            name="email"
            id="email"
            placeholder="Insira seu email aqui..."
          />
          <button disabled={isSendingForm} className="btnEnter" type="submit">
            {isSendingForm ? <CgSpinner size={26} /> : 'Enviar Email'}
          </button>
          <Link href="/login" className="textLink">
            Retornar para página de login
          </Link>
        </>
      )}
    </form>
  );
}

export default EsqueciSenha;
