import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardDetails from '../components/CardDetails';
import CardRecommendation from '../components/CardRecommendation';
import '../recipeDetailsStyles/recipeDetails.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// caso a receita já tenha sido feita, descomentar as linhas abaixo e o btn start recipe tem que sumir
const mockDoneRecipesLocalStorage = [
  // {
  //   id: '52771',
  //   type: 'meal',
  //   nationality: 'Italian',
  //   category: 'Vegetarian',
  //   alcoholicOrNot: '',
  //   name: 'Spicy Arrabiata Penne',
  //   image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //   doneDate: '23/06/2020',
  //   tags: ['Pasta', 'Curry'],
  // },
  // {
  //   id: '178319',
  //   type: 'drink',
  //   nationality: '',
  //   category: 'Cocktail',
  //   alcoholicOrNot: 'Alcoholic',
  //   name: 'Aquamarine',
  //   image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //   doneDate: '23/06/2020',
  //   tags: [],
  // },
];

const mockInProgressRecipes = {
  drinks: {
    178319: [],
  },
  meals: {
    52771: [],
  },
};

function RecipeDetails() {
  const history = useHistory();
  const idPath = history.location.pathname.split('/')[2];
  const [recipeDetails, setRecipeDetails] = useState({});
  const [idVideo, setIdVideo] = useState('');
  const [pathMeals, setPathMeals] = useState(false);
  const [recommendation, setRecommendation] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState(false);
  const [inProgressRecipes, setInProgressRecipes] = useState(false);

  const limitedArray = (arr) => {
    const array = [];
    const MAX_LENGTH = 6;
    arr?.forEach((item) => {
      if (array.length < MAX_LENGTH) {
        array.push(item);
      }
    });
    return array;
  };

  const setMockRecipesDoneLocalStorage = () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipesLocalStorage));
  };

  const setMockInProgressRecipes = () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(mockInProgressRecipes));
  };

  const getDoneRecipesLocalStorage = () => {
    const doneRecipesLocalStorage = JSON.parse(localStorage
      .getItem('doneRecipes'));

    doneRecipesLocalStorage.map((e) => e.id === idPath && setDoneRecipes(true));
  };

  const getInProgressRecipes = () => {
    const inProgressRecipesLocalStorage = JSON.parse(localStorage
      .getItem('inProgressRecipes'));
    const idsDrinksInProgress = Object.keys(inProgressRecipesLocalStorage.drinks);
    const idsMealsInProgress = Object.keys(inProgressRecipesLocalStorage.meals);
    const verifyDrinks = idsDrinksInProgress.some((e) => e === idPath);
    const verifyMeals = idsMealsInProgress.some((e) => e === idPath);

    if (verifyDrinks || verifyMeals) {
      setInProgressRecipes(true);
    }
  };

  useEffect(() => {
    const fetchsRecomendations = async () => {
      const path = history.location.pathname.split('/')[1];

      const END_POINT_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const END_POINT_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

      const response = await fetch(path === 'meals' ? END_POINT_DRINK : END_POINT_MEALS);
      const result = await response.json();
      if (path === 'meals') {
        setRecommendation(limitedArray(result.drinks));
      } else {
        setRecommendation(limitedArray(result.meals));
      }
    };
    fetchsRecomendations();
    setMockRecipesDoneLocalStorage();
    getDoneRecipesLocalStorage();
    setMockInProgressRecipes();
    getInProgressRecipes();
  }, [history]);

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

  const onClickStartRecipe = () => {
    if (pathMeals) {
      history.push('/');
    }
  };

  const arrMeasure = getMeasureAndIngredient('strMeasure');
  const arrIngredient = getMeasureAndIngredient('strIngredient');

  const measureAndIngredient = arrMeasure
    .map((measure, index) => `${measure} - ${arrIngredient[index]}`);

  return (
    <div className="recipe-details-container">
      <CardDetails
        img={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
        title={ recipeDetails.strMeal || recipeDetails.strDrink }
        category={ pathMeals ? recipeDetails.strCategory : recipeDetails.strAlcoholic }
        ingredients={ measureAndIngredient }
        instructions={ recipeDetails.strInstructions }
        idVideo={ idVideo }
        pathMeals={ pathMeals }
        measureAndIngredient={ measureAndIngredient }
      />
      <div className="container-scroll">
        {
          recommendation.map((e, index) => (
            <CardRecommendation
              img={ e.strDrinkThumb || e.strMealThumb }
              title={ e.strDrink || e.strMeal }
              key={ index }
              dataTestCard={ `${index}-recommendation-card` }
              dataTestTitle={ `${index}-recommendation-title` }
            />
          ))
        }
      </div>
      <div className="container-btn">
        {
          !doneRecipes
            && (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="btn-start-recipe"
                onClick={ onClickStartRecipe }
              >
                { inProgressRecipes ? 'Continue Recipe' : 'Start Recipe'}
              </button>
            )
        }
      </div>
    </div>
  );
}

export default RecipeDetails;
