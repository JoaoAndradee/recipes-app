import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando a página de login', () => {
  it('Verificando se a página de login renderiza corretamente', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { name: /login/i });
    const email = screen.getByTestId('email-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('Verificando se o botao é desabilitado ao digitar email/senha', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '1234567');

    expect(button).toBeEnabled();
  });
});
