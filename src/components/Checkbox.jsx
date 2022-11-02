import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

function Checkbox(props) {
  const { index, texto, qtdIngredients, notChecked } = props;
  const [checkedOne, setCheckedOne] = useState(false);

  const [myStyle, setMyStyle] = useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
    setMyStyle(!myStyle);
  };

  return (
    <div>
      <label
        style={ myStyle
          ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
          : { textDecoration: 'none' } }
        htmlFor="bela checkbox"
        data-testid={ `${index}-ingredient-step` }
      >
        <span>
          { texto }
        </span>
        <input
          className="teste"
          id="bela checkbox"
          type="checkbox"
          checked={ checkedOne }
          onChange={ handleChangeOne }
        />
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  index: PropTypes.string,
  qtdIngredients: PropTypes.string,
}.isRequired;

export default Checkbox;
