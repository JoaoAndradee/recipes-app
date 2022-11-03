import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from './Input';
import Context from '../context/Context';
import fetchRecipes from '../services/fetchRecipes';
import fetchDrinks from '../services/fetchDrinks';

function SearchBar() {
  const {
    inputSearch,
    handleInputSearch,
    handleSearchRadio,
    searchRadio,
    setResultsSearch,
    resultsSearch,
  } = useContext(Context);

  const history = useHistory();

  useEffect(() => {
    if (resultsSearch.length === 1) {
      const { location: { pathname } } = history;
      if (pathname === '/meals') {
        const { idMeal } = resultsSearch[0];
        history.push(`/meals/${idMeal}`);
      } else {
        const { idDrink } = resultsSearch[0];
        history.push(`/drinks/${idDrink}`);
      }
    }
  }, [resultsSearch, history]);

  const limitedArray = (arr) => {
    const array = [];
    const MAX_LENGTH = 12;
    arr?.forEach((item) => {
      if (array.length < MAX_LENGTH) {
        array.push(item);
      }
    });
    return array;
  };

  const fetchClickBtn = async () => {
    const path = history.location.pathname;
    let result;
    if (path === '/meals') {
      result = await fetchRecipes(inputSearch, searchRadio);
      if (result === undefined || result.meals === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (result !== undefined) {
        setResultsSearch(limitedArray(result.meals));
      }
    } else if (path === '/drinks') {
      result = await fetchDrinks(inputSearch, searchRadio);
      if (result === undefined || result.drinks === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (result !== undefined) {
        setResultsSearch(limitedArray(result.drinks));
      }
    }
  };

  return (
    <div>
      <Input
        name="search"
        placeholder="Procure por uma receita"
        type="text"
        value={ inputSearch }
        onChange={ handleInputSearch }
        dataTestid="search-input"
      />
      <Input
        type="radio"
        name="search"
        dataTestid="ingredient-search-radio"
        label="Ingredient"
        value="Ingredient"
        onChange={ handleSearchRadio }
        checked={ searchRadio === 'Ingredient' }
      />
      <Input
        type="radio"
        name="search"
        dataTestid="name-search-radio"
        label="name"
        value="name"
        onChange={ handleSearchRadio }
        checked={ searchRadio === 'name' }
      />
      <Input
        type="radio"
        name="search"
        dataTestid="first-letter-search-radio"
        label="First Letter"
        value="first-letter"
        onChange={ handleSearchRadio }
        checked={ searchRadio === 'first-letter' }
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          fetchClickBtn();
          // checkLength();
        } }
      >
        Pesquisar
      </button>
    </div>
  );
}

export default SearchBar;
