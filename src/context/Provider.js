import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

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

  const saveUserLocalStorage = useCallback(() => {
    localStorage.setItem('user', JSON.stringify({ email }));
  }, [email]);

  const contextValue = useMemo(() => ({
    email,
    password,
    isDisabled,
    handleEmail,
    handlePassword,
    saveUserLocalStorage,
  }), [
    email,
    password,
    isDisabled,
    saveUserLocalStorage,
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
