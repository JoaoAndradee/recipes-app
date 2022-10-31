import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente Header', () => {
  it('Verifica se os primeiros 5 filtros do array retornado da API estão corretos', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const btnFilter1 = await screen.findByTestId('Ordinary Drink-category-filter');
    const btnFilter2 = await screen.findByTestId('Cocktail-category-filter');
    const btnFilter3 = await screen.findByTestId('Shake-category-filter');
    const btnFilter4 = await screen.findByTestId('Other/Unknown-category-filter');
    const btnFilter5 = await screen.findByTestId('Cocoa-category-filter');
    expect(btnFilter1).toBeInTheDocument();
    expect(btnFilter2).toBeInTheDocument();
    expect(btnFilter3).toBeInTheDocument();
    expect(btnFilter4).toBeInTheDocument();
    expect(btnFilter5).toBeInTheDocument();
  });
});
