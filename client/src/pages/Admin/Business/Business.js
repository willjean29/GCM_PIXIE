import React from 'react';
import { Tabs, Card,  Avatar,Row, Col} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import './Business.scss';
const Business = () => {

  const { Meta } = Card;
  const { TabPane } = Tabs;

  return (  
    <>

    <Row>
    <Col span={16} push={8}>
    <Tabs className="card-container">
      <TabPane tab="Tab Title 1" key="1">
        <p>Content of Tab Pane 1</p>
        <p>Content of Tab Pane 1</p>
        <p>Content of Tab Pane 1</p>
      </TabPane>
      <TabPane tab="Tab Title 2" key="2">
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
        <p>Content of Tab Pane 2</p>
      </TabPane>
      <TabPane tab="Tab Title 3" key="3">
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
      </TabPane>
    </Tabs>
    
    </Col>
    <Col span={8} pull={16}>
    <Card
        style={{ width: 300}}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
          title="Card title"
          description="This is the description"
        />
      </Card>
    </Col>
  </Row>
    
    
    </>
  );
}
 
export default Business; 