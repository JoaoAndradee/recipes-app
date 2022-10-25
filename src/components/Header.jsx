import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function Header({
  title,
  search,
  searchIcon,
  profileIcon,
  dataTestIdSearch,
  dataTestIdProfile,
}) {
  const history = useHistory();

  return (
    <header>
      <div>
        <div>
          {
            search
            && (
              <button type="button">
                <img
                  data-testid={ dataTestIdSearch }
                  src={ searchIcon }
                  alt="search-icon"
                />
              </button>
            )
          }
          <button
            type="button"
            onClick={ () => history.push('/profile') }
          >
            <img
              data-testid={ dataTestIdProfile }
              src={ profileIcon }
              alt="profile-icon"
            />
          </button>
        </div>
        <div>
          <h3 data-testid="page-title">{title}</h3>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  search: PropTypes.bool,
  title: PropTypes.string,
  searchIcon: PropTypes.string,
  profileIcon: PropTypes.string,
  dataTestIdSearch: PropTypes.string,
  dataTestIdProfile: PropTypes.string,
};

Header.defaultProps = {
  title: '',
  search: '',
  searchIcon: '',
  profileIcon: '',
  dataTestIdSearch: '',
  dataTestIdProfile: '',
};

export default Header;
