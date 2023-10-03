import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import Footer from './Footer';
import Perfil from '../images/Perfil.svg';
import Logout from '../images/Logout.svg';
import Done from '../images/done.svg';
import Favorite from '../images/favorite.svg';
import styles from './Profile.module.css';

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
        profileIcon={ profileIcon }
      />
      <div className={ styles.container }>
        <img
          src={ Perfil }
          alt="Profile"
          width="50"
          height="50"
          className={ styles.profileIcon }
        />
        <h3 className={ styles.profileText }>PROFILE</h3>
        <p data-testid="profile-email">{emailLocalStorage}</p>
        <Link to="/done-recipes">
          <button
            type="button"
            className={ styles.buttonProfile }
            data-testid="profile-done-btn"
          >
            <img className={ styles.imgsTeste } src={ Done } alt="Done recipes" />
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            className={ styles.buttonProfile }
            type="button"
            data-testid="profile-favorite-btn"
          >
            <img className={ styles.imgsTeste } src={ Favorite } alt="Done recipes" />
            Favorite Recipes
          </button>
        </Link>
        <Link to="/">
          <button
            className={ styles.buttonProfile }
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleClick }
          >
            <img className={ styles.imgsTeste } src={ Logout } alt="Done recipes" />
            Logout
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
export default Profile;
