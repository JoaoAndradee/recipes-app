import React from 'react';
import { screen, waitFor } from '@testing-library/react';
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
  ///////////////////////////
  it('Verifica a página de Profile', async () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByRole('textbox');
    const passInput = screen.getByPlaceholderText(/senha/i);
    const enter = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, 'awd@awd.com');
    userEvent.type(passInput, 'minhasenhaxablau');
    userEvent.click(enter);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
    });
    const profileBtn = screen.getByRole('img', { name: /profile-icon/i });
    userEvent.click(profileBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/profile');
    });
    const email = screen.getByText(/awd@awd\.com/i);
    expect(email).toBeInTheDocument();
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
    act(() => {
      history.push('/profile');
    });
    await waitFor(() => {
      expect(history.location.pathname).toBe('/profile');
    });
    const noEmail = screen.getAllByTestId('profile-email');
    expect(noEmail).toBeInTheDocument();
  });
});
