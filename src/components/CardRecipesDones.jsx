import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function CardRecipesDones(props) {
  const {
    index,
    name,
    image,
    category,
    isMeal,
    nationality,
    alcoholic,
    data,
    tags,
    linkRecipe,
    isDrinkOrFood,
    id,
  } = props;

  const [hasClicked, setHasClicked] = useState(false);

  return (
    <div>
      <a href={ linkRecipe } style={ { textDecoration: 'none' } }>
        <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
      </a>
      <a href={ linkRecipe }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          width="300"
        />
      </a>
      <h3 data-testid={ `${index}-horizontal-top-text"` }>{category}</h3>
      { isMeal
      && (
        <h3 data-testid={ `${index}-horizontal-top-text` }>
          {`${nationality} - ${category}`}
        </h3>
      )}
      <h3 data-testid={ `${index}-horizontal-top-text` }>
        { alcoholic }
      </h3>
      <h2 data-testid={ `${index}-horizontal-done-date` }>{data}</h2>
      <button
        type="button"
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => {
          navigator.clipboard
            .writeText(`${window.location.origin}/${isDrinkOrFood}/${id}`);
          setHasClicked(!hasClicked);
        } }
      >
        <img src={ shareIcon } alt="compartilhar" />
        { hasClicked
          && <span>Link copied!</span>}
      </button>
      {tags?.map((item, indexTag) => (
        <span
          data-testid={ `${index}-${item}-horizontal-tag` }
          style={ { margin: '10px' } }
          key={ indexTag }
        >
          {item}
        </span>
      ))}
    </div>
  );
}

CardRecipesDones.propTypes = {
  category: PropTypes.string,
  data: PropTypes.string,
  image: PropTypes.string,
  index: PropTypes.string,
  name: PropTypes.string,
  tags: PropTypes.shape({
    map: PropTypes.string,
  }),
}.isRequired;

export default CardRecipesDones;
