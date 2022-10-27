import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando a página de profile', () => {
  it('Verifica o retorno do localStorage', () => {
    const { history } = renderWithRouter(<App />);

    window.localStorage.setItem('user', JSON.stringify({ email: 'email@mail.com' }));

    act(() => {
      history.push('/profile');
    });

    expect(localStorage.getItem('user')).toEqual(JSON.stringify({ email: 'email@mail.com' }));
    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    userEvent.click(logoutBtn);
  });
});
