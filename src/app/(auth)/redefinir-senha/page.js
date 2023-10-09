'use client';

import { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import Link from 'next/link';
import { useUser } from '@/contexts/userContext';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

function RedefinirSenha() {
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const { verificarCodRedefinicaoSenha, confirmarRedefinicaoSenha, logIn } =
    useUser();

  const searchParams = useSearchParams();

  const isPasswordResetWithSuccess = !isSendingForm && isPasswordReset;

  async function handleRedefinirSenha(e) {
    try {
      e.preventDefault();
      setIsSendingForm(true);

      const mode = searchParams.get('mode');
      const actionCode = searchParams.get('oobCode');

      if (mode === 'resetPassword') {
        const userEmail = await verificarCodRedefinicaoSenha(actionCode);

        const form = e.target;
        const formData = new FormData(form);
        const newPassword = formData.get('password');

        await confirmarRedefinicaoSenha(actionCode, newPassword);
        await logIn(userEmail, newPassword);

        setIsSendingForm(false);
        setIsPasswordReset(true);
      } else {
        toast.error('Erro: mode searchParam não é igual a `resetPassword`.');
        setIsSendingForm(false);
      }
    } catch (error) {
      toast.error(error.message);
      setIsSendingForm(false);
    }
  }

  return (
    <div className="authPageContainer">
      <div className="formWrapper">
        <form onSubmit={handleRedefinirSenha} className="authForm">
          {isPasswordResetWithSuccess ? (
            <>
              <h1>Senha Redefinida!</h1>
              <p>
                Sua senha foi redefinida com sucesso, agora você já poderá
                utilizar sua nova senha nas próximas vezes em que fizer login na
                plataforma.
              </p>

              <Link href="/" className="btnEnter">
                Ir para o dashboard
              </Link>
            </>
          ) : (
            <>
              <h1>Redefinir senha</h1>
              <p>
                Por favor insira sua nova senha abaixo, após finalizar o
                procedimento você será autenticado automaticamente e poderá
                acessar a plataforma.
              </p>
              <input
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
                className="btnEnter"
                type="submit"
              >
                {isSendingForm ? <CgSpinner size={28} /> : 'Redefinir Senha'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default RedefinirSenha;
