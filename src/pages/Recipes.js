import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Context from '../context/Context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import CardRecipes from '../components/CardRecipes';

function Recipes({ location: { pathname } }) {
  const { resultsSearch } = useContext(Context);
  const [initialReq, setInitialReq] = useState([]);

  const limitedIndex = 12;
  const verifyRouteMeals = pathname === '/meals';

  const fetchFirstMeals = async () => {
    const req = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await req.json();
    setInitialReq(data.meals);
  };
  const fetchFirstDrinks = async () => {
    const req = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await req.json();
    setInitialReq(data.drinks);
  };

  useEffect(() => {
    if (verifyRouteMeals) {
      fetchFirstMeals();
    } else {
      fetchFirstDrinks();
    }
  }, [resultsSearch, verifyRouteMeals]);

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
        verifyRouteMeals && resultsSearch.length !== 0
          ? (

            resultsSearch?.map((e, index) => (
              // <div
              //   key={ e.strMeal }
              //   data-testid={ `${index}-recipe-card` }
              // >
              //   <h3
              //     data-testid={ `${index}-card-name` }
              //   >
              //     {e.strMeal}
              //   </h3>
              //   <img
              //     src={ e.strMealThumb }
              //     alt={ e.strMeal }
              //     data-testid={ `${index}-card-img` }
              //   />
              <CardRecipes index={ index } e={ e } key={ e.idMeal } />
              // </div>
            ))
          )
          : (
            resultsSearch?.map((e, index) => (
              // <div
              //   key={ e.strDrink }
              //   data-testid={ `${index}-recipe-card` }
              // >
              //   <h3
              //     data-testid={ `${index}-card-name` }
              //   >
              //     {e.strDrink}
              //   </h3>
              //   <img
              //     src={ e.strDrinkThumb }
              //     alt={ e.strDrink }
              //     data-testid={ `${index}-card-img` }
              //   />
              <CardRecipes
                index={ index }
                e={ e }
                data-testid={ `${index}-recipe-card` }
                key={ e.idDrink }
              />

              // </div>
            ))

          )
      }
      {
        initialReq.length !== 0 && verifyRouteMeals ? (
          initialReq.map((element, index) => (
            index >= limitedIndex ? ('') : (
              <CardRecipes index={ index } e={ element } key={ element.idMeal } />
            )
          ))
        )
          : initialReq.map((element, index) => (
            index >= limitedIndex ? ('') : (
              <CardRecipes index={ index } e={ element } key={ element.idDrink } />
            )
          ))

      }
    </div>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default Recipes;
