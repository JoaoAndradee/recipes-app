import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function CardDetails({
  img,
  title,
  category,
  instructions,
  idVideo,
  pathMeals,
  measureAndIngredient,
  addToFavorites,
  isFavorite,
  removeFromFavorites,
}) {
  const [hasCopied, setHasCopied] = useState(false);
  const history = useHistory();

  const handleCopy = () => {
    const { location: { pathname: url } } = history;
    copy(`http://localhost:3000${url}`);
    setHasCopied(true);
    const TIME = 2000;
    setTimeout(() => {
      setHasCopied(false);
    }, TIME);
  };

  return (
    <div className="card-details-container">
      <div>
        <img
          src={ img }
          alt=""
          data-testid="recipe-photo"
          width="250"
        />
        <h3
          data-testid="recipe-title"
        >
          {title}
        </h3>
      </div>
      <p
        data-testid="recipe-category"
      >
        {category}
      </p>
      <ul>
        {
          measureAndIngredient.map((item, index) => (
            <li
              key={ item }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {item}
            </li>
          ))
        }
      </ul>
      <p
        data-testid="instructions"
        className="card-details-container"
      >
        {instructions}
      </p>
      <div>
        <button type="button" data-testid="share-btn" onClick={ handleCopy }>
          <img src={ shareIcon } alt="" />
        </button>
        { hasCopied && <span>Link copied!</span>}
        <button
          type="button"
          onClick={ isFavorite ? removeFromFavorites : addToFavorites }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt=""
            data-testid="favorite-btn"
          />
        </button>
      </div>
      {
        pathMeals
        && <iframe
          data-testid="video"
          width="250"
          height="205"
          src={ `https://www.youtube.com/embed/${idVideo.split('v=')[1]}` }
          title="YouTube video player"
          allow="accelerometer;
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      }

    </div>
  );
}

CardDetails.propTypes = {
  img: PropTypes.string,
  pathMeals: PropTypes.bool.isRequired,
  title: PropTypes.string,
  category: PropTypes.string,
  idVideo: PropTypes.string,
  instructions: PropTypes.string,
  measureAndIngredient: PropTypes.arrayOf(PropTypes.string),
  addToFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  isFavorite: PropTypes.string,
};

CardDetails.defaultProps = {
  img: '',
  title: '',
  category: '',
  idVideo: '',
  instructions: '',
  measureAndIngredient: [''],
  isFavorite: '',
};

export default CardDetails;
