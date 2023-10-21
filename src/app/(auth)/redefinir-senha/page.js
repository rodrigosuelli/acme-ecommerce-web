'use client';

import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import Link from 'next/link';
import { useUser } from '@/contexts/userContext';
import { useSearchParams } from 'next/navigation';

function RedefinirSenha() {
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const { resetPassword } = useUser();

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const isPasswordResetWithSuccess = !isSendingForm && isPasswordReset;

  async function handleResetPassword(e) {
    try {
      e.preventDefault();
      setIsSendingForm(true);

      const form = e.target;
      const formData = new FormData(form);
      const newPassword = formData.get('password');

      await resetPassword(code, newPassword);

      setIsPasswordReset(true);
    } catch (error) {
      // Let interceptor handle
    } finally {
      setIsSendingForm(false);
    }
  }

  return (
    <form onSubmit={handleResetPassword} className="authForm">
      {isPasswordResetWithSuccess ? (
        <>
          <h1>Senha Redefinida!</h1>
          <p>
            Sua senha foi redefinida com sucesso, agora você já poderá utilizar
            sua nova senha nas próximas vezes em que fizer login na plataforma.
          </p>

          <Link href="/" className="btnPrimary btnEnter">
            Ir para a homepage
          </Link>
        </>
      ) : (
        <>
          <h1>Redefinir senha</h1>

          <p>
            Por favor insira sua nova senha abaixo, após finalizar o
            procedimento você será autenticado automaticamente e poderá acessar
            a plataforma.
          </p>
          <input
            className="inputDefault"
            hidden
            readOnly
            autoComplete="off"
            type="text"
            name="email_code"
            id="email_code"
            value={code || undefined}
          />
          <input
            className="inputDefault"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="Nova senha"
            type="password"
            name="password"
            id="password"
          />
          <button
            disabled={isSendingForm}
            className="btnPrimary btnEnter"
            type="submit"
          >
            {isSendingForm ? <CgSpinner size={26} /> : 'Redefinir Senha'}
          </button>
        </>
      )}
    </form>
  );
}
export default RedefinirSenha;
