import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando a página de progresso de receita', () => {
  it('verificando se a checkbox funciona', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks/51213/in-progress');
    });
    const btnCheckIngredient1 = screen.getByTestId('0-ingredient-step');
    userEvent.click(btnCheckIngredient1);
  });
});
it('verifica se o botão de favorito funciona', async () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/meals/52771/in-progress');
  });
  const btnHearth = screen.getByRole('button', { name: /teste/i });
  userEvent.click(btnHearth);
  userEvent.click(btnHearth);

  // // lalala 3
  // const btnCheck1 = screen.getByRole('checkbox', {
  //   name: /1 pound \- penne rigate 1\/4 cup \- olive oil 3 cloves \- garlic 1 tin \- chopped tomatoes 1\/2 teaspoon \- red chile flakes 1\/2 teaspoon \- italian seasoning 6 leaves \- basil spinkling \- parmigiano\-reggiano/i,
  // });
  // const btnCheck2 = screen.getByTestId('1-ingredient-step');
  // const btnCheck3 = screen.getByTestId('2-ingredient-step');
  // const btnCheck4 = screen.getByTestId('3-ingredient-step');
  // const btnCheck5 = screen.getByTestId('4-ingredient-step');
  // const btnCheck6 = screen.getByTestId('5-ingredient-step');
  // const btnCheck7 = screen.getByTestId('6-ingredient-step');
  // const btnCheck8 = screen.getByTestId('7-ingredient-step');
  // const btnFinish = screen.getByRole('button', {
  //   name: /finalizar/i,
  // });
  // userEvent.click(btnCheck1);
  // userEvent.click(btnCheck2);
  // userEvent.click(btnCheck3);
  // userEvent.click(btnCheck4);
  // userEvent.click(btnCheck5);
  // userEvent.click(btnCheck6);
  // userEvent.click(btnCheck7);
  // userEvent.click(btnCheck8);
  // await waitFor(() => {
  //   userEvent.click(btnFinish);
  // }, { timeout: 2000 });
  // expect(btnFinish).toBeDisabled();
});
