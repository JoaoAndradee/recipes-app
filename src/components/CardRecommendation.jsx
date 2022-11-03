import React from 'react';
import PropTypes from 'prop-types';

function CardRecommendation({ img, title, dataTestCard, dataTestTitle }) {
  return (
    <div data-testid={ dataTestCard } className="card-recommendation">
      <img
        src={ img }
        alt=""
        data-testid="recipe-photo"
        className="img-card"
      />
      <p
        data-testid={ dataTestTitle }
        className="title-card"
      >
        {title}
      </p>
    </div>
  );
}

CardRecommendation.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  dataTestCard: PropTypes.string,
  dataTestTitle: PropTypes.string,
};

CardRecommendation.defaultProps = {
  img: '',
  title: '',
  dataTestCard: '',
  dataTestTitle: '',
};

export default CardRecommendation;
