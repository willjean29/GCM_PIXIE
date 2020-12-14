import React from 'react';
import {useSelector} from 'react-redux';
import { Card, Row, Col, Descriptions, Tabs, Image, Button } from 'antd';
import { RedditOutlined, InfoCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import NoAvatar from '../../../assets/img/png/no-avatar.png';
import Information from './components/Information';
import EditProfile from './components/EditProfile';
import Logo from './components/Logo';
import './Profile.scss';
const Profile = () => {
  const administrator = useSelector(state => state.authentication.user);
  const { TabPane } = Tabs;
  return (  
    <>  
      <Card>
        <h1 className="title-card">Información Personal</h1>
      </Card>
      {/* <Card> */}
        <Row gutter={24} className="info-profile">
          <Col span={24} md={8}
            style={{textAlign: 'center' }}
            className="info-profile__card"
          >
            <Card
              hoverable
              className="card"
              cover={
                <Image
                  width={200}
                  src={administrator ? (administrator.image ? administrator.image : NoAvatar) : (NoAvatar)}
                  className="card__image"
                />
              }
            >
              <Card.Meta title="Administrador" description="Administrador Registrado" className="card__description"/>
              <Descriptions bordered column={1} className="card__content">
                <Descriptions.Item label="DNI">{administrator && administrator.dni}</Descriptions.Item>
                <Descriptions.Item label="Edad">
                  {administrator && (administrator.edad ? administrator.edad : "--" )}
                </Descriptions.Item>
                <Descriptions.Item label="Género">Masculino</Descriptions.Item>
              </Descriptions>
              <Button type="primary" style={{width: '100%'}} className="btn-submit">Seguir</Button>
            </Card>
          </Col>
          <Col span={24} md={16}
            className="info-competition__tabs"
          >
          <Card hoverable>
            <Tabs className="tab-content">
              <TabPane tab={<span className="tab_text"><InfoCircleOutlined />Información</span>} key="1" >
                <Information administrator={administrator}/>
              </TabPane>
              <TabPane tab={<span className="tab_text"><CheckCircleOutlined />Editar</span>} key="2" >
                {/* <Maps/> */}
                <EditProfile administrator={administrator}/>
              </TabPane>
              <TabPane tab={<span className="tab_text"><RedditOutlined />Logo</span>} key="3" >
                <Logo administrator={administrator}/>
              </TabPane>
            </Tabs>
            </Card>
          </Col>
        </Row>
      {/* </Card> */}
    </>
  );
}
 
export default Profile;