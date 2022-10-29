import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Carousel, Card, Stack } from 'react-bootstrap';
import CardDetails from '../components/CardDetails';
import CardRecommendation from '../components/CardRecommendation';
import '../recipeDetailsStyles/recipeDetails.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecipeDetails() {
  const history = useHistory();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [idVideo, setIdVideo] = useState('');
  const [pathMeals, setPathMeals] = useState(false);
  const [recommendation, setRecommendation] = useState([]);

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

  const arrMeasure = getMeasureAndIngredient('strMeasure');
  const arrIngredient = getMeasureAndIngredient('strIngredient');
  const measureAndIngredient = arrMeasure
    .map((measure, index) => `${measure} - ${arrIngredient[index]}`);

  return (
    <div>
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
        <div id="slider" className="slider-container container-fluid">
          {/* {
            recommendation.map((e, index) => (
              <CardRecommendation
                img={ e.strDrinkThumb || e.strMealThumb }
                title={ e.strDrink || e.strMeal }
                key={ index }
                dataTestCard={ `${index}-recommendation-card` }
                dataTestTitle={ `${index}-recommendation-title` }
              />
            ))
          } */}
          <Carousel style={ { height: 200, border: '2px solid red' } }>
            {recommendation.map((item, index, arrOriginal) => (
              <Carousel.Item key={ index } style={ { height: 200 } }>
                <Stack
                  direction="horizontal"
                  className="h-100 justify-content-center align-items-center"
                  gap={ 3 }
                  style={ { border: '1px solid green', backgroundColor: 'green' } }
                >
                  <Card
                    style={ { width: '10rem', border: '1px solid pink' } }
                    data-testid={ `${index}-recommendation-card` }
                  >
                    <Card.Body>
                      <Card.Img
                        src={ item.strDrinkThumb || item.strMealThumb }
                        alt={ item.strDrink || item.strMeal }
                        data-testid="recipe-photo"
                      />
                      <Card.Title data-testid={ `${index}-recommendation-title` }>
                        { item.strDrink || item.strMeal }
                      </Card.Title>
                    </Card.Body>
                  </Card>
                  { index + 1 < arrOriginal.length && (
                    <Card
                      style={ { width: '10rem', border: '1px solid pink' } }
                      data-testid={ `${index}-recommendation-card` }
                    >
                      <Card.Body>
                        <Card.Img
                          src={ arrOriginal[index +1].strDrinkThumb || arrOriginal[index +1].strMealThumb }
                          alt={ arrOriginal[index +1].strDrink || arrOriginal[index +1].strMeal }
                          data-testid="recipe-photo"
                        />
                        <Card.Title data-testid={ `${index}-recommendation-title` }>
                          { arrOriginal[index +1].strDrink || arrOriginal[index +1].strMeal }
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  )}
                </Stack>
              </Carousel.Item>
            ))}
            {/* {recommendation.map((e, i) => console.log(e))} */}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
