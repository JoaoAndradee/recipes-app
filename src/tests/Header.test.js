import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const dataTestidEmail = 'email-input';
const dataTestidPassword = 'password-input';
const dataTestidLoginBtn = 'login-submit-btn';

describe('Testando o componente Header', () => {
  it('Verifica se o header é renderizado corretamente na rota "/meals"', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId(dataTestidEmail);
    const password = screen.getByTestId(dataTestidPassword);
    const button = screen.getByTestId(dataTestidLoginBtn);

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '1234567');
    userEvent.click(button);
    history.push('/meals');

    const title = screen.getByTestId('page-title');
    const searchIcon = screen.getByTestId('search-top-btn');
    const profileIcon = screen.getByTestId('profile-top-btn');

    expect(title).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();

    userEvent.clear(email);
    userEvent.clear(password);
  });
});
