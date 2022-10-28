import React from 'react';
import PropTypes from 'prop-types';

function CardDetails({
  img,
  dataTestPhoto,
  title,
  dataTestTitle,
  category,
  dataTestCategory,
  instructions,
  dataTestInstru,
  idVideo,
  dataTestIdVideo,
  dataTestIngredients,
}) {
  return (
    <div>
      <div>
        <img
          src={ img }
          alt=""
          data-testid={ dataTestPhoto }
          width="250"
        />
        <h3
          data-testid={ dataTestTitle }
        >
          {title}
        </h3>
      </div>
      <p
        data-testid={ dataTestCategory }
      >
        {category}
      </p>
      <ul data-testid={ dataTestIngredients }>
        <li>ingredientes</li>
        <li>quantidade</li>
      </ul>
      <p
        data-testid={ dataTestInstru }
      >
        {instructions}
      </p>
      <iframe
        data-testid={ dataTestIdVideo }
        width="250"
        height="205"
        src={ `https://www.youtube.com/embed/${idVideo}` }
        title="YouTube video player"
        allow="accelerometer;
        autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />

    </div>
  );
}

CardDetails.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  idVideo: PropTypes.string,
  dataTestPhoto: PropTypes.string,
  dataTestTitle: PropTypes.string,
  dataTestCategory: PropTypes.string,
  dataTestInstru: PropTypes.string,
  instructions: PropTypes.string,
  dataTestIdVideo: PropTypes.string,
  dataTestIngredients: PropTypes.string,
};

CardDetails.defaultProps = {
  img: '',
  title: '',
  category: '',
  idVideo: '',
  dataTestPhoto: '',
  dataTestTitle: '',
  dataTestCategory: '',
  dataTestInstru: '',
  instructions: '',
  dataTestIdVideo: '',
  dataTestIngredients: '',
};

export default CardDetails;
