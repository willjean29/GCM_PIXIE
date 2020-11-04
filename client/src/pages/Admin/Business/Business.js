import React from 'react';
import { Tabs,Row, Col} from 'antd';
import { InfoCircleFilled, GlobalOutlined, FileImageOutlined } from '@ant-design/icons';

import List from './List/List'
import LogoBusiness from './Logo/LogoBusiness'
import CardBusiness from './Card/CardBusiness'

import './Business.scss';

const Business = () => {

  
  const { TabPane } = Tabs;

  return (  
    <>

    <Row >
      <Col span={24} className="labelL__top">Información de mi Empresa</Col>
      <Col span={16} push={8}>
        <Tabs className="card-container">
          <TabPane tab={<span className="tab_text"><InfoCircleFilled />Información</span>} key="1" >
            <List/>
          </TabPane>
          <TabPane tab={<span className="tab_text"><GlobalOutlined />Mapa</span>} key="2" >
            //Mapa
          </TabPane>
          <TabPane tab={<span className="tab_text"><FileImageOutlined />Logo</span>} key="3" >
            <LogoBusiness/>6
          </TabPane>
        </Tabs>
      </Col>
      <Col span={8} pull={16}>
        <CardBusiness/>
      </Col>
  </Row>
    
    
    </>
  );
}
 
export default Business; 