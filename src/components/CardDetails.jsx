import React from 'react';
import PropTypes from 'prop-types';

function CardDetails({ img, title, category, video }) {
  return (
    <div>
      <div>
        <img
          src={ img }
          alt=""
          data-testid=""
          width="250"
        />
        <h3
          data-testid=""
        >
          {title}
        </h3>
      </div>
      <p
        data-testid=""
      >
        {category}
      </p>
      <ul data-testid="">
        <li>ingredientes</li>
        <li>quantidade</li>
      </ul>
      <p
        data-testid=""
      >
        Instrução
      </p>
      <iframe
        data-testid=""
        width="250"
        height="205"
        src={ `https://www.youtube.com/embed/${video}` }
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
};

CardDetails.defaultProps = {
  img: '',
  title: '',
  category: '',
};

export default CardDetails;
