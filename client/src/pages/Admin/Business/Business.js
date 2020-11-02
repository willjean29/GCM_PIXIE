import React from 'react';
import { Tabs, Card,  Avatar,Row, Col} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, InfoCircleFilled, GlobalOutlined, FileImageOutlined } from '@ant-design/icons';

import List from './List/List'
import LogoBusiness from './Logo/LogoBusiness'

import Logo from '../../../assets/img/png/no-avatar.png'

import './Business.scss';

const Business = () => {

  const { Meta } = Card;
  const { TabPane } = Tabs;

  return (  
    <>

    <Row>
    <Col span={16} push={8}>
    <Tabs className="card-container">
      <TabPane tab={<span><InfoCircleFilled />Información</span>} key="1" >
        <List/>
      </TabPane>
      <TabPane tab={<span><GlobalOutlined />Mapa</span>} key="2" >
        
      </TabPane>
      <TabPane tab={<span><FileImageOutlined />Logo</span>} key="3" >
        <LogoBusiness/>
      </TabPane>
    </Tabs>
    
    </Col>
    <Col span={8} pull={16}>
    <Card
        style={{ width: 300}}
        cover={
          <img
            alt="example"
            src={Logo}
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title="Nombre de empresa"
          description="This is the description"
        />
      </Card>
    </Col>
  </Row>
    
    
    </>
  );
}
 
export default Business; 