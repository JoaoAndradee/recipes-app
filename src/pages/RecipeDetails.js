import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardDetails from '../components/CardDetails';

function RecipeDetails() {
  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [idVideo, setIdVideo] = useState('');
  

  useEffect(() => {
    const path = history.location.pathname.split('/')[1];
    const id = history.location.pathname.split('/')[2];
    const fetchRecipesDetails = async () => {
      const endPointMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const endPointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

      const result = await fetch(path === 'meals' ? endPointMeals : endPointDrink)
        .then((response) => response.json());
      // console.log(Object.entries(result[path][0]));
      // setRecipeDetails(result[path][0]);
      // const urlVideo = result[path][0];
      // setIdVideo(urlVideo.strYoutube.split('v=')[1]);
      return result[path][0];
    };

    const teste = async () => {
      const recipe = await fetchRecipesDetails();
      setRecipeDetails(recipe);
    };
    teste();
  }, [history]);
  console.log(recipeDetails);
  return (
    <div>
      {
        recipeDetails.length !== 0
        && <CardDetails
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
        />

      }
    </div>
  );
}

export default RecipeDetails;
