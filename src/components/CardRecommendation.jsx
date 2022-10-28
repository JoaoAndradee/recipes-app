import React from 'react';
import PropTypes from 'prop-types';

function CardRecommendation({ img, title, dataTestCard, dataTestTitle }) {
  return (
    <div data-testid={ dataTestCard }>
      <img
        src={ img }
        alt=""
        data-testid="recipe-photo"
        width="100"
      />
      <p
        data-testid={ dataTestTitle }
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
