import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Checkbox from '../components/Checkbox';
import meals from '../components/MealTest';
import drinks from '../components/DrinkTest';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

// [{
//   id: id-da-receita,
//   type: meal-ou-drink,
//   nationality: nacionalidade-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita
// }]

function RecipesInProgress(props) {
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [hasClicked, setHasClicked] = useState(false);
  const [icon, setIcon] = useState(false);
  const [dataFavorite, setDataFavorite] = useState([]);
  const [dataFinish, setDataFinish] = useState([]);

  const { checkedOne } = props;

  const history = useHistory();
  const { location: { pathname } } = history;
  const mealOrDrink = pathname.includes('meals');

  useEffect(() => { setDataMeals(meals); }, []);
  useEffect(() => { setDataDrinks(drinks); }, []);

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

  const handleClickFinish = () => {
    console.log(dataDrinks);
    console.log(dataMeals);
    const date = new Date();
    setDataFinish([{
      id: mealOrDrink ? dataMeals.idMeal : dataDrinks.idDrink,
      type: mealOrDrink ? 'meal' : 'drink',
      nationality: mealOrDrink ? dataMeals.strArea : '',
      category: mealOrDrink ? dataMeals.strCategory : dataDrinks.strCategory,
      alcoholicOrNot: mealOrDrink ? '' : dataDrinks.strAlcoholic,
      name: mealOrDrink ? dataMeals.strMeal : dataDrinks.strDrink,
      image: mealOrDrink ? dataMeals.strMealThumb : dataDrinks.strDrinkThumb,
      doneDate: date.toLocaleDateString(),
      tags: mealOrDrink ? (dataMeals.strTags ? dataMeals.strTags : [])
        : (dataDrinks.strTags ? dataDrinks.strTags : []),
    }]);
  };

  useEffect(() => {
    if (dataFavorite.length !== 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(dataFavorite));
    }
  }, [dataFavorite]);

  useEffect(() => {
    if (dataFinish.length !== 0) {
      localStorage.setItem('doneRecipes', JSON.stringify(dataFinish));
      history.push('/done-recipes');
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
