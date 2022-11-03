import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa a página Recipes.', () => {
  it('Verifica se os primeiros 5 filtros do array retornado da API (drinks)', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
  })
});
