import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa a página Recipes.', () => {
  const { history } = renderWithRouter(<App />);
  let ordinaryRecipe;
  const pushToPage = async (pathname) => {
    await waitFor(() => {
      act(() => {
        history.push(pathname);
      });
    });
  };
  it(
    'Verifica se os primeiros 5 filtros do array retornado da API (drinks).',
    async () => {
      // const pushToDrinks = () => pushToPage('/drinks');
      await waitFor(() => {
        pushToPage('/drinks');
        expect(history.location.pathname).toBe('/drinks');
        const allBtn = screen.getByRole('button', { name: /all/i });
        const ordinary = screen.getByRole('button', { name: /ordinary drink/i });
        const cocktail = screen.getByRole('button', { name: /cocktail/i });
        const shake = screen.getByRole('button', { name: /shake/i });
        const other = screen.getByRole('button', { name: /other\/unknown/i });
        const cocoa = screen.getByRole('button', { name: /cocoa/i });
        expect(allBtn).toBeInTheDocument();
        expect(ordinary).toBeInTheDocument();
        expect(cocktail).toBeInTheDocument();
        expect(shake).toBeInTheDocument();
        expect(other).toBeInTheDocument();
        expect(cocoa).toBeInTheDocument();
      });
    },
  );
  it('Verifica a funcionalidade dos botões de filtro (drinks).', async () => {
    await waitFor(() => {
      pushToPage('/drinks');
      expect(history.location.pathname).toBe('/drinks');
      waitFor(() => {
        const allBtn = screen.findByRole('button', { name: /all/i });
        const ordinary = screen.getByRole('button', { name: /ordinary drink/i });
        expect(allBtn).toBeInTheDocument();
        expect(ordinary).toBeInTheDocument();
        waitFor(() => {
          userEvent.click(ordinary);
          setTimeout(() => {
            ordinaryRecipe = screen.getByRole('heading', { name: /3-mile long island iced tea/i });
            expect(ordinaryRecipe).toBeInTheDocument();
          }, 500)
          waitFor(() => {
            userEvent.click(allBtn);
            setTimeout(() => {
              const firstAllRecipe = screen.getByRole('heading', { name: /gg/i });
              expect(firstAllRecipe).toBeInTheDocument();
            }, 500)
          });
        });
      });
    });
  });
  it('Verifica a funcionalidade dos cards (drinks).', async () => {
    await waitFor(() => {
      pushToPage('/drinks');
      expect(history.location.pathname).toBe('/drinks');
      waitFor(() => {
        const allBtn = screen.findByRole('button', { name: /all/i });
        const ordinary = screen.getByRole('button', { name: /ordinary drink/i });
        expect(allBtn).toBeInTheDocument();
        expect(ordinary).toBeInTheDocument();
        waitFor(() => {
          userEvent.click(ordinary);
          expect(ordinaryRecipe).toBeInTheDocument();
          waitFor(() => {
            userEvent.click(allBtn);
            const firstAllRecipe = screen.getByTestId('0-recipe-card');
            expect(firstAllRecipe).toBeInTheDocument();
            waitFor(() => {
              userEvent.click(firstAllRecipe);
              waitFor(() => {
                const recipesDetails = screen.getByText(/recipesdetails/i);
                expect(history.location.pathname).toBe('/drinks/15997');
                expect(recipesDetails).toBeInTheDocument();
              });
            });
          });
        });
      });
    });
  });
});
