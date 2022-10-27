import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';

function Profile() {
  // const [teste, setTeste] = useState('');
  const handleClick = () => {
    localStorage.clear();
  };
  // useEffect(() => {
    // const teste2 = JSON.parse(localStorage.getItem('user'));
    // setTeste(teste2);
    // console.log(teste2.email);
  // }, []);

  return (
    <div>
      <Header
        dataTestIdProfile="profile-top-btn"
        title="Profile"
        profileIcon={ profileIcon }
      />
      {/* <p data-testid="profile-email">{ teste.email }</p> */}
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Logout
        </button>
      </Link>
    </div>
  );
}
export default Profile;
