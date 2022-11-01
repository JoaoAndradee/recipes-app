import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Checkbox from '../components/Checkbox';
import meals from '../components/MealTest';
import drinks from '../components/DrinkTest';

function RecipesInProgress() {
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);

  const history = useHistory();
  const { location: { pathname } } = history;
  const mealOrDrink = pathname.includes('meals');
  // console.log(mealOrDrink);

  useEffect(() => { setDataMeals(meals); }, []);
  useEffect(() => { setDataDrinks(drinks); }, []);

  const getMeasureAndIngredient = (param, param2) => {
    const arrKeyAndValue = Object.entries(param2);
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
  let arrMeasure;
  let arrIngredient;
  if (mealOrDrink) {
    arrMeasure = getMeasureAndIngredient('strMeasure', dataMeals);
    arrIngredient = getMeasureAndIngredient('strIngredient', dataMeals);
  } else {
    arrMeasure = getMeasureAndIngredient('strMeasure', dataDrinks);
    arrIngredient = getMeasureAndIngredient('strIngredient', dataDrinks);
  }
  const measureAndIngredient = arrMeasure
    .map((measure, index) => `${measure} - ${arrIngredient[index]}`);

  console.log(mealOrDrink);
  // getMeasureAndIngredient();
  // const measureAndIngredient = arrMeasure
  // .map((measure, index) => `${measure} - ${arrIngredient[index]}`);

  // const arrKeyAndValue2 = Object.entries(meals);
  // const objectToArray = [];
  // arrKeyAndValue2.forEach((item) => {
  //   objectToArray.push(item[0]);
  //   return objectToArray;
  // });
  // console.log(objectToArray);
  // console.log(dataDrinks);
  return (

    <div>
      { mealOrDrink ? (
        <div>
          <img
            src={ dataMeals.strMealThumb }
            alt={ dataMeals.strMeal }
            data-testid="recipe-photo"
          />
          <h2
            data-testid="recipe-title"
          >
            { dataMeals.strMeal }
          </h2>
          <h4
            data-testid="recipe-category"
          >
            { dataMeals.strCategory }
          </h4>
          <ul>
            {
              measureAndIngredient.map((item, index) => (
                <li key={ index }>
                  <Checkbox index={ index } texto={ item } />
                </li>

              ))
            }
          </ul>
          <span
            data-testid="instructions"
          >
            { dataMeals.strInstructions }
          </span>
          <div>
            <button
              type="button"
              data-testid="share-btn"
            >
              Compartilhar
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
            >
              Favoritar
            </button>
            <button
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finalizar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <img
            src={ dataDrinks.strDrinkThumb }
            alt={ dataDrinks.strDrink }
            data-testid="recipe-photo"
          />
          <h2
            data-testid="recipe-title"
          >
            { dataDrinks.strDrink }
          </h2>
          <h4
            data-testid="recipe-category"
          >
            { dataDrinks.strAlcoholic }
          </h4>
          <ul>
            {
              measureAndIngredient.map((item2, index2) => (
                <li key={ index2 }>
                  <Checkbox index={ index2 } texto={ item2 } />
                </li>

              ))
            }
          </ul>
          <span
            data-testid="instructions"
          >
            { dataDrinks.strInstructions }
          </span>
          <div>
            <button
              type="button"
              data-testid="share-btn"
            >
              Compartilhar
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
            >
              Favoritar
            </button>
            <button
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finalizar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default RecipesInProgress;
