import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando a página de profile', () => {
  it('Verifica o retorno do localStorage', () => {
    const { history } = renderWithRouter(<App />);
    const key = 'user';
    const mock = { email: 'email@mail.com' };
    window.localStorage.setItem(key, JSON.stringify(mock));
    act(() => {
      history.push('/profile');
    });
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(mock));
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutBtn);
  });
});
