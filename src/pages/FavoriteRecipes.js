import React from 'react';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';

function FavoriteRecipes() {
  return (
    <div>
      <Header
        dataTestIdProfile="profile-top-btn"
        title="Favorite Recipes"
        profileIcon={ profileIcon }
      />
    </div>
  );
}

export default FavoriteRecipes;
