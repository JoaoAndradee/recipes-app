import React, { useContext } from 'react';
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
  } = useContext(Context);

  const history = useHistory();

  const fetchClickBtn = async () => {
    const path = history.location.pathname;
    let result;
    if (path === '/meals') {
      result = await fetchRecipes(inputSearch, searchRadio);
      setResultsSearch(result.meals);
    } else if (path === '/drinks') {
      result = await fetchDrinks(inputSearch, searchRadio);
      setResultsSearch(result.drinks);
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
        onClick={ fetchClickBtn }
      >
        Pesquisar
      </button>
    </div>
  );
}

export default SearchBar;
