import React, {useState,useEffect} from 'react';
import { RedditOutlined, InfoCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import { Card, Row, Col, Descriptions, Tabs, Image, Button } from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import Information from './components/Information';
import Maps from './components/Maps';
import Logo from './components/Logo';
import {obtenerEmpresaAction} from '../../../../redux/actions/businessActions';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import './InfoBusiness.scss';
const InfoBusiness = () => {
  const dispatch = useDispatch();
  const [reloadBusiness, setReloadBusiness] = useState(false);
  const obtenerEmpresa = () => dispatch(obtenerEmpresaAction());
  const business = useSelector(state => state.business.data);

  const { TabPane } = Tabs;
  useEffect(() => {
    obtenerEmpresa();
    setReloadBusiness(false);
    // eslint-disable-next-line
  }, [dispatch,reloadBusiness])
  return (  
    <>
      <Card>
        <h1 className="title-card">Información de la Empresa</h1>
      </Card>
      <Card>
        <Row gutter={24} className="info-business">
          <Col span={24} md={8}
            style={{textAlign: 'center' }}
            className="info-business__card"
          >
            <Card
              hoverable
              className="card"
              cover={
                <Image
                  width={200}
                  src={business ? (business.imagen ? business.imagen : NoAvatar) : NoAvatar}
                  className="card__image"
                />
              }
            >
              <Card.Meta title={business && business.nombreComercial} description="Empresa Afiliada" className="card__description"/>
              <Descriptions bordered column={1} className="card__content">
                <Descriptions.Item label="RUC">{business && business.ruc}</Descriptions.Item>
                <Descriptions.Item label="Clientes">{business && business.clientes.length}</Descriptions.Item>
                <Descriptions.Item label="Estado">{business && business.estado}</Descriptions.Item>
              </Descriptions>
              <Button type="primary" style={{width: '100%'}} className="btn-submit" disabled>Vista Previa</Button>
            </Card>
          </Col>
          <Col span={24} md={16}
            className="info-competition__tabs"
          >
            <Tabs className="card-container">
              <TabPane tab={<span className="tab_text"><InfoCircleOutlined />Información</span>} key="1" >
                <Information business={business}/>
              </TabPane>
              <TabPane tab={<span className="tab_text"><CheckCircleOutlined />Maps</span>} key="2" >
                <Maps/>
                {/* Acciones */}
              </TabPane>
              <TabPane tab={<span className="tab_text"><RedditOutlined />Logo</span>} key="3" >
                <Logo business={business}/>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </>
  );
}
 
export default InfoBusiness;