import React from 'react';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';

function Profile() {
  return (
    <div>
      <Header
        dataTestIdProfile="profile-top-btn"
        title="Profile"
        profileIcon={ profileIcon }
      />
    </div>
  );
}

export default Profile;
