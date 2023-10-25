'use client';

import styles from './InputCEP.module.css';

function InputCupom() {
  return (
    <div className={styles.cepField}>
      <input
        className="inputDefault"
        required
        placeholder="Insira seu cupom aqui..."
        name="cupom"
        id="cupom"
        minLength={3}
        maxLength={30}
      />
      <button className="btnPrimary" type="button">
        Aplicar
      </button>
    </div>
  );
}

export default InputCupom;
