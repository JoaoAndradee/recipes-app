import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import App from '../App';

beforeEach(() => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/meals');
  });
});

describe('Testando o componente SearchBar', () => {
  it('Verifica se o fetch é feito após clicar no botão', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealIngredients),
    }));

    const iconSearch = screen.getByTestId('search-top-btn');
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId('search-input');
    const ingridentRadio = screen.getByTestId('ingredient-search-radio');
    const nameRadio = screen.getByTestId('name-search-radio');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const btnPesquisar = screen.getByTestId('exec-search-btn');

    expect(inputSearch).toBeInTheDocument();
    expect(ingridentRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(btnPesquisar).toBeInTheDocument();

    userEvent.type(inputSearch, 'rice');
    userEvent.click(ingridentRadio);
    userEvent.click(btnPesquisar);

    expect(fetch).toHaveBeenCalled();
  });

  // it('Verifica se ao clicar no icon profile, é redirecionado p/ pagina profile', () => {
  //   const { history } = renderWithRouter(<App />);
  //   act(() => {
  //     history.push('/meals');
  //   });

  //   const iconProfile = screen.getByRole('button', { name: /profile-icon/i });
  //   const iconSearch = screen.getByRole('button', { name: /search-icon/i });

  //   userEvent.click(iconSearch);
  //   const input = screen.getByTestId('search-input');
  //   expect(input).toBeInTheDocument();
  //   userEvent.type(input, 'xablau');

  //   userEvent.click(iconSearch);
  //   expect(input).not.toBeInTheDocument();

  //   userEvent.click(iconProfile);
  //   expect(window.location.pathname).toBe('/profile');
  // });
});
