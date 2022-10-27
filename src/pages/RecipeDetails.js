import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function RecipeDetails() {
  const history = useHistory();
  const [mealsDetails, setMealsDetails] = useState([]);
  const [drinksDetails, setDrinksDetails] = useState([]);
  // console.log(history.location.pathname.split('/')[1]); path
  // console.log(history.location.pathname.split('/')[2]); id

  const fetchRecipesDetails = async (path, id) => {
    const endPointMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const endPointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    let detailsMeals;
    let detailsDrink;

    switch (path) {
    case 'meals':
      detailsMeals = await fetch(endPointMeals).then((response) => response.json());

      setMealsDetails(detailsMeals.meals);

      break;
    case 'drinks':
      detailsDrink = await fetch(endPointDrink).then((response) => response.json());
      setDrinksDetails(detailsDrink.drinks);

      break;
    default:
      return console.log('default');
    }
  };

  useEffect(() => {
    const path = history.location.pathname.split('/')[1];
    const id = history.location.pathname.split('/')[2];

    fetchRecipesDetails(path, id);
  }, []);
  return (
    <div>RecipesDetails</div>
  );
}

export default RecipeDetails;
