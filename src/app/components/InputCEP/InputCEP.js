'use client';

import { InputMask } from '@react-input/mask';
import styles from './InputCEP.module.css';

function InputCEP() {
  return (
    <div className={styles.cepField}>
      <InputMask
        className="inputDefault"
        required
        autoComplete="postal-code"
        placeholder="Insira o seu CEP aqui"
        name="cep"
        id="cep"
        title="Insira um CEP válido no formato: 12345-123"
        pattern="^[0-9]{5}-[0-9]{3}$"
        mask="ddddd-ddd"
        replacement={{ d: /[0-9]/ }}
      />
      <button className="btnPrimary" type="button">
        Calcular
      </button>
    </div>
  );
}

export default InputCEP;
