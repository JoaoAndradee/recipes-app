import React from 'react';
import PropTypes from 'prop-types';

function Input({ name, placeholder, type, value, onChange, dataTestid, label, checked, onClick }) {
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
          // Depois apagar linha de baixo e colocar checked = { checked }
          defaultChecked={ checked }
          onClick={ onClick }
        />
      </label>
    </div>
  );
}

Input.propTypes = {
  checked: PropTypes.bool,
  dataTestid: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};

Input.defaultProps = {
  placeholder: '',
  value: '',
  name: '',
  dataTestid: '',
  onChange: null,
  label: '',
  checked: false,
};

export default Input;
