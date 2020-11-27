import React from 'react';
import Error from '../../../assets/img/svg/page_construction.svg';
import './Profile.scss';
const Profile = () => {
  return (  
    <div className="profile-content">
      <div className="wrapper">
        <img src={Error} alt="Página en construcción"/>
      </div>
      <h2>Página en Construción</h2>
    </div>
  );
}
 
export default Profile;