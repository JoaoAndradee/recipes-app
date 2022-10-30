import React from 'react';
import PropTypes from 'prop-types';

function CardDetails({
  img,
  title,
  category,
  instructions,
  idVideo,
  pathMeals,
  measureAndIngredient,
}) {
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
};

CardDetails.defaultProps = {
  img: '',
  title: '',
  category: '',
  idVideo: '',
  instructions: '',
  measureAndIngredient: [''],
};

export default CardDetails;
