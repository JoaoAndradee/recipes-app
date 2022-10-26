import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Context from '../context/Context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Recipes({ location: { pathname } }) {
  const { resultsSearch } = useContext(Context);
  console.log(resultsSearch);
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
      {
        verifyRouteMeals
          ? (
            resultsSearch?.map((e, index) => (
              <div
                key={ e.strMeal }
                data-testid={ `${index}-recipe-card` }
              >
                <h3
                  data-testid={ `${index}-card-name` }
                >
                  {e.strMeal}
                </h3>
                <img
                  src={ e.strMealThumb }
                  alt={ e.strMeal }
                  data-testid={ `${index}-card-img` }
                />
              </div>
            ))
          )
          : (
            resultsSearch?.map((e, index) => (
              <div
                key={ e.strDrink }
                data-testid={ `${index}-recipe-card` }
              >
                <h3
                  data-testid={ `${index}-card-name` }
                >
                  {e.strDrink}
                </h3>
                <img
                  src={ e.strDrinkThumb }
                  alt={ e.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </div>
            ))

          )
      }
    </div>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default Recipes;
