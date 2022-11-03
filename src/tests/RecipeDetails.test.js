import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeDetails from '../pages/RecipeDetails';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando a pagina de Recipe Details', () => {
  it('verifica se adiciona ao favorito', () => {
    renderWithRouter(<RecipeDetails />);
    const favoriteBtn = screen.getByTestId('botao-favorito');
    const favoriteIcon = screen.getByTestId('favorite-btn');
    userEvent.click(favoriteBtn);

    expect(favoriteIcon).toHaveAttribute('src', 'blackHeartIcon.svg');
  });
  it('verifica se remove do favorito', async () => {
    await waitFor(() => renderWithRouter(<RecipeDetails />));
    const favoriteBtn = screen.getByTestId('botao-favorito');
    const favoriteIcon = screen.getByTestId('favorite-btn');

    userEvent.click(favoriteBtn);
    expect(favoriteIcon).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });
});
