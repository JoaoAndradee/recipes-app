import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputSearch, setInputSearch] = useState('');
  const [searchRadio, setSearchRadio] = useState('Ingredient');
  const [resultsSearch, setResultsSearch] = useState([]);
  const [tudoTrue, setTudoTrue] = useState(true);
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [hasClicked, setHasClicked] = useState(false);
  const [icon, setIcon] = useState(false);
  const [dataFavorite, setDataFavorite] = useState([]);
  const [dataFinish, setDataFinish] = useState([]);
  const [iconWithStorage, setIconWithStorage] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const verifyBtn = () => {
      const regex = /\S+@\S+\.\S+/;
      const verifyEmail = email && regex.test(email);
      const MIN_PASSWORD = 7;
      const verifyPassword = password.length >= MIN_PASSWORD;

      setIsDisabled(!(verifyEmail && verifyPassword));
    };
    verifyBtn();
  }, [email, password]);

  const handleEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleInputSearch = ({ target }) => {
    setInputSearch(target.value);
  };

  const handleSearchRadio = ({ target }) => {
    setSearchRadio(target.value);
  };

  const btnEntrar = useCallback(() => {
    localStorage.setItem('user', JSON.stringify({ email }));

    history.push('/meals');
  }, [email, history]);

  const contextValue = useMemo(() => ({
    email,
    password,
    isDisabled,
    inputSearch,
    searchRadio,
    resultsSearch,
    tudoTrue,
    dataMeals,
    dataDrinks,
    dataFavorite,
    hasClicked,
    icon,
    dataFinish,
    iconWithStorage,
    handleEmail,
    handlePassword,
    handleInputSearch,
    btnEntrar,
    handleSearchRadio,
    setResultsSearch,
    setDataDrinks,
    setDataMeals,
    setTudoTrue,
    setHasClicked,
    setIcon,
    setDataFavorite,
    setDataFinish,
    setIconWithStorage,
  }), [
    email,
    password,
    isDisabled,
    btnEntrar,
    inputSearch,
    searchRadio,
    resultsSearch,
    tudoTrue,
    setTudoTrue,
    dataMeals,
    dataDrinks,
    hasClicked,
    icon,
    dataFavorite,
    dataFinish,
    iconWithStorage,
  ]);

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
