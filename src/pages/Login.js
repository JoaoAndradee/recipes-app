import React from 'react';
import Input from '../components/Input';

function Login() {
  return (
    <div>
      <h3>Login</h3>
      <div>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          // value={ }
          // onChange={}
          dataTestid="email-input"
        />
        <Input
          name="password"
          placeholder="Senha"
          type="password"
          // value={ }
          // onChange={ }
          dataTestid="password-input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          // onClick={ }
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
