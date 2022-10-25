import React from 'react';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';

function DoneRecipes() {
  return (
    <div>
      <Header
        dataTestIdProfile="profile-top-btn"
        title="Done Recipes"
        profileIcon={ profileIcon }
      />
    </div>
  );
}

export default DoneRecipes;
