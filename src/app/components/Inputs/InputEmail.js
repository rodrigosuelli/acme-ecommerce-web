'use client';

import styles from './InputCEP.module.css';

function InputEmail() {
  return (
    <div className={styles.cepField}>
      <input
        className="inputDefault"
        required
        autoComplete="email"
        type="email"
        name="email"
        id="email"
        placeholder="Insira seu email aqui..."
      />
      <button className="btnPrimary" type="button">
        Enviar
      </button>
    </div>
  );
}

export default InputEmail;
