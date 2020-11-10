import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Layout} from 'antd';
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
        <Content className="layout-admin__content">
            <LoadRouters routes={routes}/>
        </Content>
        <Header className="layout-admin__header">
          <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed}/>
        </Header>
        <Footer className="layout-admin__footer">  
          Footer ...
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