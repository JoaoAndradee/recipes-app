import React, { useContext } from 'react';
import Input from './Input';
import Context from '../context/Context';

function SearchBar() {
  const { inputSearch, handleInputSearch } = useContext(Context);
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
        dataTestid="ingredient-search-radio"
        label="Ingrediente"
        // value={ inputSearch }
        // onChange={ handleInputSearch }
      />
      <Input
        type="radio"
        dataTestid="name-search-radio"
        label="name"
      />
      <Input
        type="radio"
        dataTestid="first-letter-search-radio"
        label="Primeira letra"
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        // onClick={ pesquisar }
      >
        Pesquisar
      </button>
    </div>
  );
}

export default SearchBar;
