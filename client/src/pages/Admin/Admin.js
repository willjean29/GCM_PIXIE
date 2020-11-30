import React from 'react';
import Error from '../../assets/img/svg/page_construction.svg';
import './Admin.scss';
const Admnin = () => {
  return (  
    <div className="admin-content">
    <div className="wrapper">
      <img src={Error} alt="Página en construcción"/>
    </div>
    <h2>Página en Construción</h2>
  </div>
  );
}
 
export default Admnin;