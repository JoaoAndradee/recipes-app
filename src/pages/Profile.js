import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import Footer from './Footer';

function Profile() {
  const handleClick = () => {
    localStorage.clear();
  };

  const getLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.email : '';
  };

  const emailLocalStorage = getLocalStorage();

  return (
    <div>
      <Header
        dataTestIdProfile="profile-top-btn"
        title="Profile"
        profileIcon={ profileIcon }
      />
      <p data-testid="profile-email">{emailLocalStorage}</p>
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
      <Footer />
    </div>
  );
}
export default Profile;
