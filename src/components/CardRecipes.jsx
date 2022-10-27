import React from 'react';
import PropTypes from 'prop-types';

export default function CardRecipes({ index, e }) {
  const keys = Object.keys(e);
  if (keys.includes('strMeal')) {
    return (
      <div data-testid={ `${index}-recipe-card` } key={ e.idMeal }>

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
    );
  }
  return (
    <div data-testid={ `${index}-recipe-card` } key={ e.idDrink }>

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
  );
}

CardRecipes.propTypes = {
  index: PropTypes.number.isRequired,
  e: PropTypes.shape({
    idMeal: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};
