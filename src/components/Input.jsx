import React from 'react';
import PropTypes from 'prop-types';

function Input({ name, placeholder, type, value, onChange, dataTestid, label }) {
  return (
    <div className="control">
      <label htmlFor={ name }>
        { label }
        <input
          className={ `input-${name}` }
          type={ type }
          name={ name }
          value={ value }
          onChange={ onChange }
          id={ name }
          placeholder={ placeholder }
          data-testid={ dataTestid }
        />
      </label>
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  dataTestid: PropTypes.string,
};

Input.defaultProps = {
  placeholder: '',
  value: '',
  name: '',
  dataTestid: '',
  onChange: null,
};

export default Input;
