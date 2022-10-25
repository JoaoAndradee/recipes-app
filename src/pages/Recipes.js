import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Recipes({ location: { pathname } }) {
  const verifyRouteMeals = pathname === '/meals';

  return (
    <div>
      <Header
        dataTestIdProfile="profile-top-btn"
        dataTestIdSearch="search-top-btn"
        title={ verifyRouteMeals ? 'Meals' : 'Drinks' }
        profileIcon={ profileIcon }
        searchIcon={ searchIcon }
        search
      />
    </div>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default Recipes;
