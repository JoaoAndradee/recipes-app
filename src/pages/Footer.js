import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
    >
      <input
        type="image"
        src={ drinkIcon }
        alt="drinkIcon"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      />
      <input
        type="image"
        src={ mealIcon }
        alt="mealIcon"
        data-testid="meals-bottom-btn"
        onClick={ () => history.push('/meals') }
      />

    </footer>
  );
}

export default Footer;
