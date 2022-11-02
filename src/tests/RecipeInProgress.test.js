import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando a página de progresso de receita', () => {
  it('lalala', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks/51213/in-progress');
    });
    const btnCheckIngredient1 = screen.getByRole('checkbox', { name: /2 oz hpnotiq 1 oz pineapple juice 1 oz banana liqueur/i });
    userEvent.click(btnCheckIngredient1);
  });
});
