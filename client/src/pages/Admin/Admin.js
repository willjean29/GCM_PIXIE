import React from 'react';
import Error from '../../assets/img/svg/page_construction.svg';
import Premio from '../../assets/img/svg/regalo.svg';
import Archivo from '../../assets/img/svg/sobresalir.svg';
import Cliente from '../../assets/img/svg/user-protection.svg';
import Concurso from '../../assets/img/svg/trofeo.svg';
import {Row, Col, Card} from 'antd';
import {RightCircleOutlined} from '@ant-design/icons';
import './Admin.scss';
const Admnin = () => {
  const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: {
      marginBottom: 24,
    },
  };
 
  return (  
    <div className="admin-content">

    <h2>Página en Construción</h2>
    <Row gutter={24}>
      <Col
        {...topColResponsiveProps}
      >
        <Card
          className="card-info"
          style={{backgroundColor: "#17a2b8"}}
        >
          <div className="card-info-content">
            <div className="card-info-content__text">
              <h3>8</h3>
              <p>Premios</p>
            </div>
            <div className="card-info-content__icon">
              <img src={Premio} alt=""/>
            </div>
          </div>
          <div className="card-info-footer"
            style={{backgroundColor: "#1591a5"}}
          >
            <p>Mas Información <RightCircleOutlined /></p>
          </div>
        </Card>
      </Col>
      <Col
        {...topColResponsiveProps}
      >
        <Card
          className="card-info"
          style={{backgroundColor: "#28a745"}}
        >
          <div className="card-info-content">
            <div className="card-info-content__text">
              <h3>8</h3>
              <p>Registros</p>
            </div>
            <div className="card-info-content__icon">
              <img src={Archivo} alt=""/>
            </div>
          </div>
          <div className="card-info-footer"
            style={{backgroundColor: "#24963e"}}
          >
            <p>Mas Información <RightCircleOutlined /></p>
          </div>
        </Card>
      </Col>
      <Col
        {...topColResponsiveProps}
      >
        <Card
          className="card-info"
          style={{backgroundColor: "#ffc107"}}
        >
          <div className="card-info-content">
            <div className="card-info-content__text">
              <h3>8</h3>
              <p>Clientes</p>
            </div>
            <div className="card-info-content__icon">
              <img src={Cliente} alt=""/>
            </div>
          </div>
          <div className="card-info-footer"
            style={{backgroundColor: "#e5ad06"}}
          >
            <p>Mas Información <RightCircleOutlined /></p>
          </div>
        </Card>
      </Col>
      <Col
        {...topColResponsiveProps}
      >
        <Card
          className="card-info"
          style={{backgroundColor: "#dc3545"}}
        >
          <div className="card-info-content">
            <div className="card-info-content__text">
              <h3>8</h3>
              <p>Concurso</p>
            </div>
            <div className="card-info-content__icon">
              <img src={Concurso} alt=""/>
            </div>
          </div>
          <div className="card-info-footer"
            style={{backgroundColor: "#c6303e"}}
          >
            <p>Mas Información <RightCircleOutlined /></p>
          </div>
        </Card>
      </Col>
    </Row>
    </div>
  );
}
 
export default Admnin;