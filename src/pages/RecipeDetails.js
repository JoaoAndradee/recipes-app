import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardDetails from '../components/CardDetails';

function RecipeDetails() {
  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [idVideo, setIdVideo] = useState('');
  const [isFetched, setIsFetched] = useState(false);
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
        setIsFetched(true);
      }
    };

    fetchRecipesDetails();
  }, [history]);
  // console.log(recipeDetails);
  return (
    <div>
      <CardDetails
        img={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
        dataTestPhoto="recipe-photo"
        title={ recipeDetails.strMeal || recipeDetails.strDrink }
        dataTestTitle="recipe-title"
        category={ recipeDetails.strCategory }
        dataTestCategory="recipe-category"
        // ingredients={}
        dataTestIngredients="0-ingredient-name-and-measure"
        instructions={ recipeDetails.strInstructions }
        dataTestInstru="instructions"
        idVideo={ idVideo }
        dataTestIdVideo="video"
        isFetched={ isFetched }
      />
    </div>
  );
}

export default RecipeDetails;
