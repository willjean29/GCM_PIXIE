import React, {useEffect, useState} from 'react';
import Error from '../../assets/img/svg/page_construction.svg';
import Premio from '../../assets/img/svg/regalo.svg';
import Archivo from '../../assets/img/svg/sobresalir.svg';
import Cliente from '../../assets/img/svg/user-protection.svg';
import Concurso from '../../assets/img/svg/trofeo.svg';
import {Row, Col, Card, Tabs, Calendar, List, Avatar, Badge} from 'antd';
import {RightCircleOutlined,RedditOutlined, PieChartOutlined, BarChartOutlined} from '@ant-design/icons';
import { Line, Pie, Column } from '@ant-design/charts';
import './Admin.scss';
const Admnin = () => {
  const { TabPane } = Tabs;
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
 
  const dataGenero = [
    {
      type: "Mujeres",
      value: 27,
    },
    {
      type: "Hombres",
      value: 25,
    }
    
  ];
  const configGenero = {
    appendPadding: 10,
    data: dataGenero,
    height: 400,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: function content(_ref) {
        var percent = _ref.percent;
        return ''.concat(Math.floor(percent * 100), '%');
      },
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };
  const dataEstado = [
    {
      type: "Activos",
      value: 30,
    },
    {
      type: "Inactivos",
      value: 70,
    }
    
  ];
  const configEstado = {
    appendPadding: 10,
    data: dataEstado,
    height: 400,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: function content(_ref) {
        var percent = _ref.percent;
        return ''.concat(Math.floor(percent * 100), '%');
      },
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
  };
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];
  const dataCliente = [
    {
        type: '77219890',
        sales: 38
    },
    {
        type: '77219891',
        sales: 52
    },
    {
        type: '77219892',
        sales: 61
    },
    {
        type: '77219893',
        sales: 145
    },
    {
        type: '77219894',
        sales: 48
    },
    {
        type: '77219895',
        sales: 38
    },
    {
        type: '77219896',
        sales: 38
    },
    {
        type: '77219897',
        sales: 38
    }
];
const configCliente = {
    data: dataCliente,
    xField: 'type',
    yField: 'sales',
    label: {
        position: 'middle',
        style: {
            fill: '#FFFFFF',
            opacity: 0.6
        }
    },
    meta: {
        type: { alias: '1' },
        sales: { alias: 'puntos' }
    }
};
  return (  
    <div className="admin-content">

    <h2>Dashboard</h2>
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
    <Row gutter={24}>
      <Col
        span={24}
        md={16}
      >
        <Card>

          <Tabs>
          <TabPane tab={<span><PieChartOutlined />Género</span>} key="1" >
            <Pie {...configGenero} 
              style={{height: "400px"}}
            />
          </TabPane>
          <TabPane tab={<span><PieChartOutlined />Estado</span>} key="2" >
            <Pie {...configEstado} 
              style={{height: "400px"}}
            />
            {/* Grafica 1 */}
          </TabPane>
          </Tabs>
        </Card>
        <Card>
        <Tabs>
          <TabPane tab={<span><BarChartOutlined />Clientes</span>} key="1" >
            <Column {...configCliente} 
              style={{height: "400px"}}
            />
          </TabPane>
          </Tabs>
        </Card>
      </Col>
      <Col
        span={24}
        md={8}
      >
        <Card className="card-list-premios">
          <div>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design UED Team"
                  />
                  <div>
                    <Badge count={25} />
                  </div>
                </List.Item>
              )}
            />
            <div className="card-list-premios__footer">
              <p>Mas Información <RightCircleOutlined /></p>
            </div>
          </div>
        </Card>
        <Card>
          <Calendar fullscreen={false}/>
        </Card>
      </Col>
    </Row>
    </div>
  );
}
 
export default Admnin;