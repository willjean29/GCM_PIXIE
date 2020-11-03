import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import {GithubOutlined, FacebookOutlined, InstagramOutlined} from '@ant-design/icons';
import {Layout, Card} from 'antd';
import MenuSider from '../components/Admin/MenuSider';
import MenuTop from '../components/Admin/MenuTop';
import './LayoutAdmin.scss';

const LayoutAdmin = (props) => {
  const {routes} = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const {Header, Content, Footer} = Layout;
 
  return (  
    <Layout>
      <MenuSider menuCollapsed={menuCollapsed}/>
      <Layout className="layout-admin" style={{marginLeft: menuCollapsed ? "80px" : "200px" }}>
        <Header className="layout-admin__header">
          <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed}/>
        </Header>
        <Content className="layout-admin__content">
          <LoadRouters routes={routes}/>
        </Content>
        <Footer className="layout-admin__footer">  
          {/* <strong>
            Copyright &copy; 2020 <b style={{color: '#1890ff'}}>PIXIE</b> 
          </strong>
          <div>
            <GithubOutlined style={{padding: '0 5px'}}/>
            <FacebookOutlined style={{padding: '0 5px'}}/>
            <InstagramOutlined style={{padding: '0 5px'}}/>
          </div>
          <div>
            <b style={{color: '#1890ff'}}>Version</b> 1.0.0
          </div> */}
          footer...
        </Footer>
      </Layout>
    </Layout>
  );
}

function LoadRouters({routes}) {  
  return (
    <Switch>
      {routes.map((route,index) => (
        <Route 
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
 
export default LayoutAdmin;