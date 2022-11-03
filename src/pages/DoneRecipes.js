import React, { useState, useEffect } from 'react';
import CardRecipesDones from '../components/CardRecipesDones';
import Header from '../components/Header';
import Input from '../components/Input';
import profileIcon from '../images/profileIcon.svg';

const detailsRecipe = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

function DoneRecipes() {
  const [filter, setFilter] = useState({
    meals: false,
    drinks: false,
    all: detailsRecipe,
  });

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(detailsRecipe));
  }, []);

  const getMeals = () => {
    const onlyMeals = JSON.parse(localStorage.getItem('doneRecipes'))
      .filter((item) => item.type === 'meal');
    return onlyMeals;
  };

  const getDrinks = () => {
    const onlyDrinks = JSON.parse(localStorage.getItem('doneRecipes'))
      .filter((item) => item.type === 'drink');
    return onlyDrinks;
  };

  const getAll = () => {
    const all = JSON.parse(localStorage.getItem('doneRecipes'));
    return all;
  };

  return (
    <div>
      <Header
        dataTestIdProfile="profile-top-btn"
        title="Done Recipes"
        profileIcon={ profileIcon }
      />
      <Input
        type="button"
        dataTestid="filter-by-meal-btn"
        value="Meals"
        onClick={ () => setFilter({
          meals: getMeals(),
          drinks: false,
          all: false,
        }) }
      />
      <Input
        type="button"
        dataTestid="filter-by-drink-btn"
        value="Drinks"
        onClick={ () => setFilter({
          meals: false,
          drinks: getDrinks(),
          all: false,
        }) }
      />
      <Input
        type="button"
        dataTestid="filter-by-all-btn"
        value="All"
        onClick={ () => setFilter({
          meals: false,
          drinks: false,
          all: getAll(),
        }) }
      />
      { filter
        && Object.values(filter).filter((item) => item !== false)[0]
          ?.map((item, index) => {
            if (item.type === 'meal') {
              return (
                <CardRecipesDones
                  key={ index }
                  index={ index }
                  isMeal
                  image={ item.image }
                  category={ item.category }
                  name={ item.name }
                  nationality={ item.nationality }
                  data={ item.doneDate }
                  tags={ item.tags.slice(0, 2) }
                  isDrinkOrFood="meals"
                  id={ item.id }
                  linkRecipe={ `/meals/${item.id}` }
                />
              );
            }
            return null;
          })}
      { filter
        && Object.values(filter).filter((item) => item !== false)[0]
          ?.map((item, index) => {
            if (item.type === 'drink') {
              return (
                <CardRecipesDones
                  key={ index }
                  index={ index }
                  image={ item.image }
                  name={ item.name }
                  alcoholic={ item.alcoholicOrNot }
                  data={ item.doneDate }
                  tags={ item.tags.slice(0, 2) }
                  id={ item.id }
                  isDrinkOrFood="drinks"
                  linkRecipe={ `/drinks/${item.id}` }
                />
              );
            }
            return null;
          })}
    </div>
  );
}

export default DoneRecipes;
