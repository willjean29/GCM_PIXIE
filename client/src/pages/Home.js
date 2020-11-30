import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import Error from '../assets/img/svg/page_construction.svg';
import './Home.scss';
const Home = () => {
  return (  
    <div className="home-content">
      <div className="wrapper">
        <img src={Error} alt="Error 404"/>
      </div>
      <Button type="primary" size="large">
        <Link to="/admin">
          Ir a Administrador
        </Link>
      </Button>
    </div>
  );
}
 
export default Home;