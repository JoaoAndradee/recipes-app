import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipesDetails from './pages/RecipesDetails';
import RecipesInProgress from './pages/RecipesInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Provider from './context/Provider';
import './App.css';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id-da-receita" component={ RecipesDetails } />
        <Route exact path="/drinks/:id-da-receita" component={ RecipesDetails } />
        <Route
          path="/meals/:id-da-receita/in-progress"
          component={ RecipesInProgress }
        />
        <Route
          path="/drinks/:id-da-receita/in-progress"
          component={ RecipesInProgress }
        />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </Provider>
  );
}

export default App;
