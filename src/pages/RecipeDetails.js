import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardDetails from '../components/CardDetails';

function RecipeDetails() {
  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [idVideo, setIdVideo] = useState('');
  const [pathMeals, setPathMeals] = useState(false);

  useEffect(() => {
    const fetchRecipesDetails = async () => {
      const path = history.location.pathname.split('/')[1];
      const id = history.location.pathname.split('/')[2];
      const endPointMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const endPointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

      const response = await fetch(path === 'meals' ? endPointMeals : endPointDrink);
      const result = await response.json();

      setRecipeDetails(result[path][0]);
      setIdVideo(result[path][0].strYoutube);

      if (path === 'meals') {
        setPathMeals(true);
      }
    };

    fetchRecipesDetails();
  }, [history]);

  const getMeasureAndIngredient = (param) => {
    const arrKeyAndValue = Object.entries(recipeDetails);
    const arrFiltered = [];
    arrKeyAndValue.forEach((item) => {
      const verifyItems = item[0]
        .includes(param) && item[1] !== null && item[1] !== ' ' && item[1] !== '';
      if (verifyItems) {
        arrFiltered.push(item[1]);
      }
      return arrFiltered;
    });
    return arrFiltered;
  };

  const arrMeasure = getMeasureAndIngredient('strMeasure');
  const arrIngredient = getMeasureAndIngredient('strIngredient');
  const measureAndIngredient = arrMeasure
    .map((measure, index) => `${measure} - ${arrIngredient[index]}`);

  console.log('arrMeasure => ', arrMeasure);
  console.log('arrIngredient => ', arrIngredient);
  console.log('final => ', measureAndIngredient);

  return (
    <div>
      <CardDetails
        img={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
        // dataTestPhoto="recipe-photo"
        title={ recipeDetails.strMeal || recipeDetails.strDrink }
        // dataTestTitle="recipe-title"
        category={ recipeDetails.strCategory }
        // dataTestCategory="recipe-category"
        ingredients={ measureAndIngredient }
        // dataTestIngredients={ `${index}-ingredient-name-and-measure` }
        instructions={ recipeDetails.strInstructions }
        // dataTestInstru="instructions"
        idVideo={ idVideo }
        // dataTestIdVideo="video"
        pathMeals={ pathMeals }
        measureAndIngredient={ measureAndIngredient }
      />
    </div>
  );
}

export default RecipeDetails;
