import React, { useContext } from 'react';
import Context from '../context/Context';
import Input from '../components/Input';

function Login() {
  const {
    email,
    password,
    isDisabled,
    handleEmail,
    handlePassword,
    btnEntrar,
  } = useContext(Context);

  return (
    <div>
      <h3>Login</h3>
      <div>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={ email }
          onChange={ handleEmail }
          dataTestid="email-input"
        />
        <Input
          name="password"
          placeholder="Senha"
          type="password"
          value={ password }
          onChange={ handlePassword }
          dataTestid="password-input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ btnEntrar }
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
