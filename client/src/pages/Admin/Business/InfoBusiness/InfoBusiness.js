import React from 'react';
import { RedditOutlined, InfoCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import { Card, Row, Col, Descriptions, Tabs, Image, Button } from 'antd';
import Information from './components/Information';
import Maps from './components/Maps';
import Logo from './components/Logo';
import './InfoBusiness.scss';
const InfoBusiness = () => {
  const { TabPane } = Tabs;
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
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  className="card__image"
                />
              }
            >
              <Card.Meta title="UNMSM" description="Empresa Registrada" className="card__description"/>
              <Descriptions bordered column={1} className="card__content">
                <Descriptions.Item label="RUC">12345678912</Descriptions.Item>
                <Descriptions.Item label="Clientes">20</Descriptions.Item>
                <Descriptions.Item label="Estado">Inactivo</Descriptions.Item>
              </Descriptions>
              <Button type="primary" style={{width: '100%'}} className="btn-submit">Vista Previa</Button>
            </Card>
          </Col>
          <Col span={24} md={16}
            className="info-competition__tabs"
          >
            <Tabs className="card-container">
              <TabPane tab={<span className="tab_text"><InfoCircleOutlined />Información</span>} key="1" >
                <Information/>
              </TabPane>
              <TabPane tab={<span className="tab_text"><CheckCircleOutlined />Maps</span>} key="2" >
                <Maps/>
                {/* Acciones */}
              </TabPane>
              <TabPane tab={<span className="tab_text"><RedditOutlined />Logo</span>} key="3" >
                <Logo/>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </>
  );
}
 
export default InfoBusiness;