import React from 'react';
import PropTypes from 'prop-types';

function Header({
  dataTestIdProfile,
  dataTestIdSearch,
  title,
  profileIcon,
  searchIcon,
  search,
}) {
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
          <button type="button">
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
  dataTestIdProfile: PropTypes.string,
  dataTestIdSearch: PropTypes.string,
  title: PropTypes.string,
  profileIcon: PropTypes.string,
  searchIcon: PropTypes.string,
  search: PropTypes.bool,
};

Header.defaultProps = {
  dataTestIdProfile: '',
  dataTestIdSearch: '',
  title: '',
  profileIcon: '',
  searchIcon: '',
  search: '',
};

export default Header;
