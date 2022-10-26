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
    handleEmail,
    handlePassword,
    handleInputSearch,
    btnEntrar,
    handleSearchRadio,
    setResultsSearch,
    inputSearch,
    searchRadio,
    resultsSearch,
  }), [
    email,
    password,
    isDisabled,
    btnEntrar,
    inputSearch,
    searchRadio,
    resultsSearch,
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
