import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from 'react';
import Context from '../context/Context';
// ((item, index) => hello[`Checked${index}`] = item.checked);

function Checkbox(props) {
  const { index, texto } = props;
  const [checkedOne, setCheckedOne] = useState(false);
  const [myStyle, setMyStyle] = useState(false);
  const [teste, setTeste] = useState(false);
  const { setTudoTrue } = useContext(Context);

  const oi = () => {
    const hello = {};
    const checkboxs = document.querySelectorAll('.teste');
    checkboxs.forEach((item, index2) => { hello[`Checked${index2}`] = item.checked; });
    const obj = localStorage.setItem('checkeds', JSON.stringify(hello));
    setTeste(obj);
  };

  const handleClick = () => {
    const myTeste = [];
    const checkboxs = document.querySelectorAll('.teste');
    checkboxs.forEach((item) => myTeste.push(item.checked));
    const allTrue = myTeste.every((item) => item === true);
    oi();
    if (allTrue) {
      setTudoTrue(false);
    } else {
      setTudoTrue(true);
    }
  };

  useEffect(() => {
    if (localStorage.checkeds === undefined) {
      const myObj = [];
      const checkboxs = document.querySelectorAll('.teste');
      checkboxs.forEach((item) => myObj.push(item.checked));
      localStorage.setItem('checkeds', JSON.stringify(myObj));
    }
    const lalala = JSON.parse(localStorage.getItem('checkeds'))[`Checked${index}`];
    setTeste(lalala);
  }, []);

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
          checked={ teste }
          // checked={ checkedOne }
          onChange={ handleChangeOne }
          onClick={ handleClick }
        />
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  index: PropTypes.string,
}.isRequired;

export default Checkbox;
