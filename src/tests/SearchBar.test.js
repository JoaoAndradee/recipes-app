import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import mealIngredients from '../../cypress/mocks/mealIngredients';
import drinkIngredients from '../../cypress/mocks/drinkIngredients';
import App from '../App';

window.alert = jest.fn();

describe('Testando o componente SearchBar', () => {
  it('Verifica se o fetch é feito após clicar no botão', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealIngredients),
    }));

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

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
});

describe('Testando o componente SearchBar', () => {
  it('Verifica se o fetch é feito após clicar no botão', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinkIngredients),
    }));

    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

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

    userEvent.type(inputSearch, 'gin tonic');
    userEvent.click(ingridentRadio);
    userEvent.click(btnPesquisar);

    expect(fetch).toHaveBeenCalled();
  });
});
