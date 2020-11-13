import React, {useState} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {GithubOutlined, FacebookOutlined, InstagramOutlined} from '@ant-design/icons';
import {Layout} from 'antd';
import AdminSingIn from '../pages/Admin/SingIn';
import MenuSider from '../components/Admin/MenuSider';
import MenuTop from '../components/Admin/MenuTop';
import './LayoutAdmin.scss';

const LayoutAdmin = (props) => {
  const {routes} = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  // const [authentication, setAuthentication] = useState(null);
  const {Header, Content, Footer} = Layout;
  const authentication = useSelector(state => state.authentication.auth);
  if(!authentication){
    return (
      <>
        <Route exact path="/admin/login" component={AdminSingIn}/>
        <Redirect to="/admin/login"/>
      </>
    )
  }
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
          <strong>
            Copyright &copy; 2020 <b style={{color: '#1890ff'}}>PIXIE</b> 
          </strong>
          <div>
            <GithubOutlined style={{padding: '0 5px'}}/>
            <FacebookOutlined style={{padding: '0 5px'}}/>
            <InstagramOutlined style={{padding: '0 5px'}}/>
          </div>
          <div>
            <b style={{color: '#1890ff'}}>Version</b> 1.0.0
          </div>
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