import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/icone-prato.svg';
import drinkIcon from '../images/icone-bebida.svg';
import '../styles/Footer.css';
import styles from './Footer.module.css';

function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      id={ styles.footerContainer }
    >
      <input
        type="image"
        src={ drinkIcon }
        className={ styles.footerIcons }
        name="drinkIcon"
        alt="drinkIcon"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      />
      <input
        type="image"
        src={ mealIcon }
        name="mealIcon"
        alt="mealIcon"
        data-testid="meals-bottom-btn"
        onClick={ () => history.push('/meals') }
      />

    </footer>
  );
}

export default Footer;
