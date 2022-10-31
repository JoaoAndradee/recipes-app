import React, { useState } from 'react';

function Checkbox() {
  const [checkedOne, setCheckedOne] = useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };
  return (
    <div>
      <label
        htmlFor="a"
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          type="checkbox"
          checked={ checkedOne }
          onChange={ handleChangeOne }
        />
      </label>
    </div>
  );
}

export default Checkbox;
