import React from 'react';
import { RedditOutlined, InfoCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import { Card, Row, Col, Descriptions, Tabs, Image, Button } from 'antd';
import Information from './components/Information';
import Actions from './components/Actions';
import Logo from './components/Logo';
import './InfoCompetition.scss';
const InfoCompetition = () => {
  const { TabPane } = Tabs;
  return (
    <>
      <Card>
        <h1 className="title-card">Información del Concurso</h1>
      </Card>
      <Card>
        <Row gutter={24} className="info-competition">
          <Col span={24} md={8}
            style={{textAlign: 'center' }}
            className="info-competition__card"
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
              <Card.Meta title="Concurso Prueba" description="Concurso Simple" className="card__description"/>
              <Descriptions bordered column={1} className="card__content">
                <Descriptions.Item label="Fecha Inicio">24/09/2020</Descriptions.Item>
                <Descriptions.Item label="Fecha Fin">24/09/2020</Descriptions.Item>
                <Descriptions.Item label="Estado">Inactivo</Descriptions.Item>
              </Descriptions>
              <Button type="primary" style={{width: '100%'}} className="btn-submit">Activar</Button>
            </Card>
          </Col>
          <Col span={24} md={16}
            className="info-competition__tabs"
          >
            <Tabs className="card-container">
              <TabPane tab={<span className="tab_text"><InfoCircleOutlined />Información</span>} key="1" >
                <Information/>
              </TabPane>
              <TabPane tab={<span className="tab_text"><CheckCircleOutlined />Acciones</span>} key="2" >
                <Actions/>
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

export default InfoCompetition;