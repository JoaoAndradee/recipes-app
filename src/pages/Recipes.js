import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Context from '../context/Context';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import CardRecipes from '../components/CardRecipes';

function Recipes({ location: { pathname } }) {
  const { setResultsSearch, resultsSearch } = useContext(Context);
  const [initialReq] = useState([]);
  const [initialReqCategory, setInitialReqCategory] = useState([]);
  // const [clickedAll, setClickedAll] = useState(false);
  // const [currentFilter, setCurrentFilter] = useState('');
  const [test, setTest] = useState([]);
  // const [myState, setMyState] = useState(false);
  // const [sync, setSync] = useState(false);

  const limitedIndex12 = 12;
  const limitedIndex5 = 5;
  const verifyRouteMeals = pathname === '/meals';

  // const handleToggle = async () => {
  //   const req = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${test}`);
  //   const data = await req.json();
  //   let resultsSearchArray = [];
  //   data.meals.forEach((element, index) => {
  //     if (index < limitedIndex12) {
  //       resultsSearchArray.push(element)
  //     };
  //     setResultsSearch(resultsSearchArray);
  //   });
  // }

  const handleFilterClickDrinks = async ({ target }) => {
    setTest(target.innerHTML);
    const req = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.innerHTML}`);
    const resultsSearchArray = [];
    const data = await req.json();
    if (Object.keys(data).includes('drinks')) {
      data.drinks.forEach((element, index) => {
        if (index < limitedIndex12) { (resultsSearchArray.push(element)); }
      });
      setResultsSearch(resultsSearchArray);
      // setCurrentFilter(resultsSearchArray);
    }
  };
  const handleFilterClickMeals = async ({ target }) => {
    setTest(target.innerHTML);
    const req = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.innerHTML}`);
    const data = await req.json();
    if (Object.keys(data).includes('meals')) {
      const resultsSearchArray = [];
      data.meals.forEach((element, index) => {
        if (index < limitedIndex12) { (resultsSearchArray.push(element)); }
      });
      setResultsSearch(resultsSearchArray);
      // setCurrentFilter(resultsSearchArray);
    }
  };

  // const fetchFirstMeals = async () => {
  //   const req = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  //   const data = await req.json();
  //   setInitialReq(data.meals);
  //   // setSync(false)
  // };
  // const fetchFirstDrinks = async () => {
  //   const req = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  //   const data = await req.json();
  //   setInitialReq(data.drinks);
  //   // setSync(false)
  // };
  const fetchCategoriesMeals = async () => {
    const req = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await req.json();
    setInitialReqCategory(data);
  };
  const fetchCategoriesDrinks = async () => {
    const req = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await req.json();
    setInitialReqCategory(data);
  };

  const allInitialRecipes = async () => {
    if (pathname === '/meals') {
      const req = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await req.json();
      const resultsSearchArray = [];
      data.meals.forEach((element, index) => {
        if (index < limitedIndex12) {
          resultsSearchArray.push(element);
        }
        setResultsSearch(resultsSearchArray);
      });
    }
    if (pathname === '/drinks') {
      const req = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await req.json();
      const resultsSearchArray = [];
      data.drinks.forEach((element, index) => {
        if (index < limitedIndex12) (resultsSearchArray.push(element));
      });
      setResultsSearch(resultsSearchArray);
    }
  };

  const getCategories = async (event) => {
    const { target } = event;
    // data.meals.filter((element) => element === param)
    if (test === target.innerHTML) {
      // console.log('oi');
      allInitialRecipes();
      setTest('');
    }
  };

  useEffect(() => {
    if (pathname === '/meals') {
      // fetchFirstMeals();
      allInitialRecipes();
      fetchCategoriesMeals();
      console.log('terminou aqui');
    } else {
      // fetchFirstDrinks();
      allInitialRecipes();
      fetchCategoriesDrinks();
    }
  }, [verifyRouteMeals, pathname]);

  // useEffect(()=> {
  //   if(clickedAll){
  //     allInitialRecipes();
  //   }
  // }, [clickedAll])

  return (
    <div>
      <Header
        dataTestIdProfile="profile-top-btn"
        dataTestIdSearch="search-top-btn"
        title={ verifyRouteMeals ? 'Meals' : 'Drinks' }
        profileIcon={ profileIcon }
        searchIcon={ searchIcon }
        search
      />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => {
          allInitialRecipes();
        } }
      >
        All
      </button>
      {
        Object.keys(initialReqCategory).includes('meals') && (
          initialReqCategory.meals.map((element, index) => (index < limitedIndex5 && (
            <button
              onClick={ (event) => {
                handleFilterClickMeals(event);
                getCategories(event);
              } }
              type="button"
              key={ `drinkCategoryKey${index}` }
              data-testid={ `${element.strCategory}-category-filter` }
            >
              {element.strCategory}
            </button>)))
        )
      }
      {
        Object.keys(initialReqCategory).includes('drinks') && !verifyRouteMeals && (
          initialReqCategory.drinks.map((element, index) => (index < limitedIndex5 && (
            <button
              onClick={ (event) => {
                handleFilterClickDrinks(event);
                getCategories(event);
              } }
              type="button"
              key={ `mealCategoryKey${index}` }
              data-testid={ `${element.strCategory}-category-filter` }
            >
              {element.strCategory}
            </button>)))
        )
      }
      {
        verifyRouteMeals && resultsSearch.length !== 0
          ? (
            resultsSearch?.map((e, index) => (
              <CardRecipes
                index={ index }
                e={ e }
                key={ `key${e.idMeal}` }
                test={ test }
              />
            ))
          )
          : (
            resultsSearch?.map((e, index) => (
              <CardRecipes
                index={ index }
                e={ e }
                data-testid={ `${index}-recipe-card` }
                key={ `key${e.idDrink}` }
              />
            ))
          )
      }

      {
        initialReq.length !== 0 && verifyRouteMeals && resultsSearch.length === 0 ? (
          initialReq.map((element, index) => (
            index <= limitedIndex12 && (
              <CardRecipes index={ index } e={ element } key={ element.idMeal } />
            )
          ))
        )
          : initialReq.map((element, index) => (
            index <= limitedIndex12 && (
              <CardRecipes index={ index } e={ element } key={ element.idDrink } />
            )
          ))

      }
    </div>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default Recipes;
