'use client';

import { EyeFilled, EyeOffFilled } from '@fluentui/react-icons';
import { useState } from 'react';

function InputPassword({ autoComplete, placeholder, name, id }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleToggleShowPassword() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="passwordField">
      <input
        required
        minLength={6}
        autoComplete={autoComplete}
        placeholder={placeholder}
        type={isPasswordVisible ? 'text' : 'password'}
        name={name}
        id={id}
      />
      <button type="button" tabindex="-1">
        {isPasswordVisible ? (
          <EyeFilled fontSize={22} onClick={handleToggleShowPassword} />
        ) : (
          <EyeOffFilled fontSize={22} onClick={handleToggleShowPassword} />
        )}
      </button>
    </div>
  );
}

export default InputPassword;
