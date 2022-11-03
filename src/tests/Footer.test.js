import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import Footer from '../pages/Footer';

describe('Testando o componente Footer', () => {
  it('Verifica se os icones do Footer é renderizado corretamente para as rota indicadas', () => {
    renderWithRouter(<Footer />);
    const btnMeals = screen.getByRole('button', { name: /drinkicon/i });
    const btnDrinks = screen.getByRole('button', { name: /mealicon/i });
    userEvent.click(btnMeals);
    userEvent.click(btnDrinks);
    expect(btnMeals).toBeInTheDocument();
    expect(btnDrinks).toBeInTheDocument();
  });
});
