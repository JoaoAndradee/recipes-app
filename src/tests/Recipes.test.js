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
    await waitFor(() => {
      // const btnFilter1 = screen.getByRole('button', { name: /ordinary drink/i });
      // const btnFilter2 = screen.getByTestId('Cocktail-category-filter');
      // const btnFilter3 = screen.getByTestId('Shake-category-filter');
      // const btnFilter4 = screen.getByTestId('Other/Unknown-category-filter');
      const btnFilter5 = screen.getByTestId('Cocoa-category-filter');
      // userEvent.click(btnFilter1);
      // userEvent.click(btnFilter2);
      // userEvent.click(btnFilter3);
      // userEvent.click(btnFilter4);
      userEvent.click(btnFilter5);
      const card = screen.getByTestId('0-recipe-card');
      userEvent.click(card);
    });

    await waitFor(() => {
      const btnFilter5 = screen.getByTestId('Cocoa-category-filter');
      userEvent.click(btnFilter5);
    });
    await waitFor(() => {
      const allBtn = screen.getByRole('button', { name: /all/i });
      userEvent.click(allBtn);
    });
    await waitFor(() => {
      const firstCard = screen.getByRole('heading', { name: /gg/i });
      userEvent.click(firstCard);
    });
    expect(typeof fetch).toBe('function');
  });

  it('Verifica se os primeiros 5 filtros do array retornado da API (meals)', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    // await waitFor(() => {
    // });
    await waitFor(() => {
      userEvent.click(btnFilter5);
      const card = screen.getByRole('heading', { name: /mbuzi choma \(roasted goat\)/i });
      userEvent.click(card);

      expect(history.location.pathname).toBe('/meals/52968');
    });

    await waitFor(() => {
      const btnFilter5 = screen.getByRole('button', { name: /goat/i });
      const allBtn = screen.getByRole('button', { name: /all/i });
      userEvent.click(btnFilter5);
      userEvent.click(allBtn);
      const firstCard = screen.getByRole('heading', { name: /corba/i });
      expect(firstCard).toBeInTheDocument();
    });
    await waitFor(() => {
      const firstCard = screen.getByRole('heading', { name: /corba/i });
      userEvent.click(firstCard);
      expect(history.location.pathname).toBe('/meals/52977');
    });
    expect(typeof fetch).toBe('function');
  });
});
