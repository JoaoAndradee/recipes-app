import PropTypes from 'prop-types';
import React, { useState } from 'react';

function Checkbox(props) {
  const { index, texto } = props;
  const [checkedOne, setCheckedOne] = useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };
  return (
    <div>
      <label
        htmlFor="bela checkbox"
        data-testid={ `${index}-ingredient-step` }
      >
        { texto }
        <input
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
}.isRequired;

export default Checkbox;
