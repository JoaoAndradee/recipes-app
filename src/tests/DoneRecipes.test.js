import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes da tela DoneRecipes', () => {
  test('Se existem functions de JSON', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/done-recipes');
    });
    expect(typeof JSON.stringify).toBe('function');
    expect(typeof JSON.parse).toBe('function');
  });
  test('Botões de filtro', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/done-recipes');
    });
    const btnFilterMeal = screen.getByTestId('filter-by-meal-btn');
    const btnFilterDrink = screen.getByTestId('filter-by-drink-btn');
    const btnFilterAll = screen.getByTestId('filter-by-all-btn');

    userEvent.click(btnFilterMeal);
    userEvent.click(btnFilterDrink);
    userEvent.click(btnFilterAll);

    expect(btnFilterMeal).toBeInTheDocument();
    expect(btnFilterDrink).toBeInTheDocument();
    expect(btnFilterAll).toBeInTheDocument();
  });
});
