import React, {useEffect, useState} from 'react';
import Error from '../../assets/img/svg/page_construction.svg';
import Premio from '../../assets/img/svg/regalo.svg';
import Archivo from '../../assets/img/svg/sobresalir.svg';
import Cliente from '../../assets/img/svg/user-protection.svg';
import Concurso from '../../assets/img/svg/trofeo.svg';
import {Row, Col, Card, Tabs, Calendar, List, Avatar, Badge, Spin} from 'antd';
import {RightCircleOutlined,RedditOutlined, PieChartOutlined, BarChartOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { Line, Pie, Column } from '@ant-design/charts';
import {dataDashboardAction, dataGeneroAction, dataEstadoAction, dataPuntosAction} from '../../redux/actions/statisticsActions';
import './Admin.scss';
const Admnin = () => {
  const dispatch = useDispatch();
  const dataDashboard = () => dispatch(dataDashboardAction());
  const obtenerDatosGenero = () => dispatch(dataGeneroAction());
  const obtenerDatosEstado = () => dispatch(dataEstadoAction());
  const obtenerDatosPuntos = () => dispatch(dataPuntosAction());
  const [reloadData, setReloadData] = useState(false);
  const datosEstaticos = useSelector(state => state.statistics.data);
  const admin = useSelector(state => state.authentication.user);
  const datosGenero = useSelector(state => state.statistics.dataGenero);
  const datosEstado = useSelector(state => state.statistics.dataEstado);
  const datosPuntos = useSelector(state => state.statistics.dataPuntos);
  useEffect(() => {
    dataDashboard();
    obtenerDatosGenero();
    obtenerDatosEstado();
    obtenerDatosPuntos();
    setReloadData(false);
    // eslint-disable-next-line
  }, [dispatch,reloadData]);
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
      value: datosGenero ? datosGenero.clientesMujeres : 30,
    },
    {
      type: "Hombres",
      value: datosGenero ? datosGenero.clientesHombres : 70,
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
      value: datosEstado ? datosEstado.clientesActivos : 30,
    },
    {
      type: "Inactivos",
      value: datosEstado ? datosEstado.clientesInactivos : 70,
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
      title: 'Producto 1',
    },
    {
      title: 'Producto 2',
    },
    {
      title: 'Producto 3',
    },
    {
      title: 'Producto 4',
    },
    {
      title: 'Producto 5',
    },
  ];
  const dataCliente = [
    {
        dni: '77219890',
        puntos: 38
    },
    {
        dni: '77219891',
        puntos: 52
    },
    {
        dni: '77219892',
        puntos: 61
    },
    {
        dni: '77219893',
        puntos: 145
    },
    {
        dni: '77219894',
        puntos: 48
    }
];
const configCliente = {
    data: datosPuntos ? datosPuntos : dataCliente,
    xField: 'dni',
    yField: 'puntos',
    label: {
        position: 'middle',
        style: {
            fill: '#FFFFFF',
            opacity: 0.6
        }
    },
    meta: {
        dni: { alias: '1' },
        puntos: { alias: 'puntos' }
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
              <h3>{datosEstaticos ? datosEstaticos.premios : 0}</h3>
              <p>Premios</p>
            </div>
            <div className="card-info-content__icon">
              <img src={Premio} alt=""/>
            </div>
          </div>
          <div className="card-info-footer"
            style={{backgroundColor: "#1591a5"}}
          >
            {datosEstaticos ? (
              <Link to="/admin/catalogue/info">
                <p style={{color: "#000"}}>Mas Información <RightCircleOutlined /></p>
              </Link>
            ) : (
              <p>Mas Información <RightCircleOutlined /></p>
            )} 

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
              <h3>{datosEstaticos ? datosEstaticos.registros : 0}</h3>
              <p>Registros</p>
            </div>
            <div className="card-info-content__icon">
              <img src={Archivo} alt=""/>
            </div>
          </div>
          <div className="card-info-footer"
            style={{backgroundColor: "#24963e"}}
          >
            {datosEstaticos ? (
              <Link to="/admin/files">
                <p style={{color: "#000"}}>Mas Información <RightCircleOutlined /></p>
              </Link>
            ) : (
              <p>Mas Información <RightCircleOutlined /></p>
            )} 
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
              <h3>{datosEstaticos ? datosEstaticos.clientes : 0}</h3>
              <p>Clientes</p>
            </div>
            <div className="card-info-content__icon">
              <img src={Cliente} alt=""/>
            </div>
          </div>
          <div className="card-info-footer"
            style={{backgroundColor: "#e5ad06"}}
          >
            {datosEstaticos ? (
              <Link to="/admin/business/clients">
                <p style={{color: "#000"}}>Mas Información <RightCircleOutlined /></p>
              </Link>
            ) : (
              <p>Mas Información <RightCircleOutlined /></p>
            )} 
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
              <h3>{datosEstaticos ? datosEstaticos.concursos : 0}</h3>
              <p>Concurso</p>
            </div>
            <div className="card-info-content__icon">
              <img src={Concurso} alt=""/>
            </div>
          </div>
          <div className="card-info-footer"
            style={{backgroundColor: "#c6303e"}}
          >
            {datosEstaticos ? (
              <Link to="/admin/competition/info">
                <p style={{color: "#000"}}>Mas Información <RightCircleOutlined /></p>
              </Link>
            ) : (
              <p>Mas Información <RightCircleOutlined /></p>
            )} 
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
              <Spin size="large" spinning={datosGenero ? false : true}>
                <Pie {...configGenero} 
                  style={{height: "400px"}}
                />
              </Spin>
          </TabPane>
          <TabPane tab={<span><PieChartOutlined />Estado</span>} key="2" >
            <Spin size="large" spinning={datosEstado ? false : true}>
              <Pie {...configEstado} 
                style={{height: "400px"}}
              />
            </Spin>
          </TabPane>
          </Tabs>
        </Card>
        <Card>
        <Tabs>
          <TabPane tab={<span><BarChartOutlined />Clientes</span>} key="1" >

            <Spin size="large" spinning={datosPuntos ? false : true}>
              <Column {...configCliente} 
                style={{height: "400px"}}
              />
            </Spin>
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
              dataSource={datosEstaticos ? datosEstaticos.productos : data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src= {item.url ? item.url : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />}
                    title={<a href="https://ant.design">{item.title ? item.title : item.name}</a>}
                    description={item.description ? item.description : "Descripcion del producto" }
                  />
                  <div>
                    <Badge count={item.points ? item.points : 100} />
                  </div>
                </List.Item>
              )}
            />
            <div className="card-list-premios__footer">
            {datosEstaticos ? (
              <Link to="/admin/catalogue/info">
                <p style={{color: "#000"}}>Mas Información <RightCircleOutlined /></p>
              </Link>
            ) : (
              <p>Mas Información <RightCircleOutlined /></p>
            )} 
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