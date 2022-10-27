import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardDetails from '../components/CardDetails';

function RecipeDetails() {
  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [urlVideo, setUrlVideo] = useState('');

  useEffect(() => {
    const fetchRecipesDetails = async () => {
      const path = history.location.pathname.split('/')[1];
      const id = history.location.pathname.split('/')[2];
      const endPointMeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const endPointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

      const result = await fetch(path === 'meals' ? endPointMeals : endPointDrink)
        .then((response) => response.json());

      setRecipeDetails(result[path][0]);
      const teste = result[path][0];

      setUrlVideo(teste.strYoutube.split('v=')[1]);
    };

    fetchRecipesDetails();
  }, [history]);

  return (
    <div>
      <CardDetails
        img={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
        title={ recipeDetails.strMeal || recipeDetails.strDrink }
        category={ recipeDetails.strCategory }
        video={ urlVideo }
      />
    </div>
  );
}

export default RecipeDetails;
