import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';

function Profile() {
  const handleClick = () => {
    localStorage.clear();
  };
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header
        dataTestIdProfile="profile-top-btn"
        title="Profile"
        profileIcon={ profileIcon }
      />
      <p data-testid="profile-email">{ email }</p>
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Logout
        </button>
      </Link>
    </div>
  );
}
export default Profile;
