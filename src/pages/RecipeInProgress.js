import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Checkbox from '../components/Checkbox';
import meals from '../components/MealTest';
import drinks from '../components/DrinkTest';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Context from '../context/Context';

function RecipesInProgress() {
  const {
    tudoTrue, dataMeals, dataDrinks, dataFavorite, hasClicked, icon, dataFinish,
    setHasClicked, setIcon, setDataFavorite, setDataFinish, setDataDrinks, setDataMeals,
  } = useContext(Context);
  const history = useHistory();
  const { location: { pathname } } = history;
  const mealOrDrink = pathname.includes('meals');
  useEffect(() => { setDataMeals(meals); }, []);
  useEffect(() => { setDataDrinks(drinks); }, []);
  const arrTagsMeal = (dataMeals.strTags ? dataMeals.strTags.split(',') : []);
  const arrTagsDrink = (dataDrinks.strTags ? dataDrinks.strTags.split(',') : []);
  const arrTags = mealOrDrink ? arrTagsMeal : arrTagsDrink;
  const arrNationalityMeal = (dataMeals.strArea ? dataMeals.strArea : '');
  const arrNationalityDrink = (dataDrinks.strArea ? dataDrinks.strArea : '');
  const arrNationality = mealOrDrink ? arrNationalityMeal : arrNationalityDrink;
  function teste() {
    const arrCategoryMeal = (dataMeals.strCategory ? dataMeals.strCategory : '');
    const arrCategoryDrink = (dataDrinks.strCategory ? dataDrinks.strCategory : '');
    const arrCategory = mealOrDrink ? arrCategoryMeal : arrCategoryDrink;
    return arrCategory;
  }
  teste();
  const handleClickFavorite = () => {
    if (!icon) {
      setDataFavorite([{
        id: mealOrDrink ? dataMeals.idMeal : dataDrinks.idDrink,
        type: mealOrDrink ? 'meal' : 'drink',
        nationality: mealOrDrink ? dataMeals.strArea : '',
        category: mealOrDrink ? dataMeals.strCategory : dataDrinks.strCategory,
        alcoholicOrNot: mealOrDrink ? '' : dataDrinks.strAlcoholic,
        name: mealOrDrink ? dataMeals.strMeal : dataDrinks.strDrink,
        image: mealOrDrink ? dataMeals.strMealThumb : dataDrinks.strDrinkThumb,
      }]);
      setIcon(!icon);
      return;
    }
    localStorage.removeItem('favoriteRecipes');
    setIcon(!icon);
  };
  useEffect(() => {
    if (tudoTrue === false) {
      const date = new Date();
      setDataFinish([{
        id: mealOrDrink ? dataMeals.idMeal : dataDrinks.idDrink,
        type: mealOrDrink ? 'meal' : 'drink',
        nationality: arrNationality,
        category: teste(),
        alcoholicOrNot: mealOrDrink ? '' : dataDrinks.strAlcoholic,
        name: mealOrDrink ? dataMeals.strMeal : dataDrinks.strDrink,
        image: mealOrDrink ? dataMeals.strMealThumb : dataDrinks.strDrinkThumb,
        doneDate: date.toISOString(),
        tags: arrTags,
      }]);
    }
  }, [tudoTrue]);
  const handleClickFinish = () => {
    history.push('/done-recipes');
  };
  useEffect(() => {
    if (dataFavorite.length !== 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(dataFavorite));
    }
  }, [dataFavorite]);
  useEffect(() => {
    if (dataFinish.length !== 0) {
      localStorage.setItem('doneRecipes', JSON.stringify(dataFinish));
    }
  }, [dataFinish, history]);
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
                  <Checkbox
                    qtdIngredients={ measureAndIngredient.length }
                    index={ index }
                    texto={ item }
                    check
                  />
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
              onClick={ () => {
                navigator.clipboard
                  .writeText(`${window.location.origin}/meals/${meals.idMeal}`);
                setHasClicked(!hasClicked);
              } }
            >
              Compartilhar
              { hasClicked
          && <span>Link copied!</span>}
            </button>
            <input
              type="image"
              data-testid="favorite-btn"
              onClick={ handleClickFavorite }
              src={ icon ? blackHeartIcon : whiteHeartIcon }
              alt="teste"
            />
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ handleClickFinish }
              disabled={ tudoTrue }
            >
              Finalizar
            </button>

          </div>
        </div>
      ) : (
        // DRINKS ---------------------------------------------------------------------------------------------
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
                  <Checkbox
                    qtdIngredients={ measureAndIngredient.length }
                    index={ index2 }
                    texto={ item2 }
                  />
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
              onClick={ () => {
                navigator.clipboard
                  .writeText(`${window.location.origin}/drinks/${drinks.idDrink}`);
                setHasClicked(!hasClicked);
              } }
            >
              Compartilhar
              { hasClicked
          && <span>Link copied!</span>}
            </button>
            <input
              type="image"
              data-testid="favorite-btn"
              onClick={ handleClickFavorite }
              src={ icon ? blackHeartIcon : whiteHeartIcon }
              alt="teste"
            />
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ handleClickFinish }
              disabled={ tudoTrue }
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
