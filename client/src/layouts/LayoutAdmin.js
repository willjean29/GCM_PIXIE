import React, {useState, useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {GithubOutlined, FacebookOutlined, InstagramOutlined} from '@ant-design/icons';
import {Layout, Button} from 'antd';
import { useMediaQuery } from 'react-responsive';
import {userLogAction} from '../redux/actions/authActions';
import AdminSingIn from '../pages/Admin/SingIn';
import MenuSider from '../components/Admin/MenuSider';
import MenuTop from '../components/Admin/MenuTop';
import MenuMobile from '../components/Admin/MenuMobile';
import './LayoutAdmin.scss';

const LayoutAdmin = (props) => {
  const {routes} = props;
  const dispatch = useDispatch();
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  // const [authentication, setAuthentication] = useState(null);
  const {Header, Content, Footer} = Layout;
  const authentication = useSelector(state => state.authentication.auth);
  const userLog = () => dispatch(userLogAction());
  const [reloadUser, setReloadUser] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  useEffect(() => {
    userLog();
    setReloadUser(false);
    // eslint-disable-next-line
  }, [dispatch,reloadUser])

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
      {
        isTabletOrMobile ? (
          <MenuMobile visible={visible} setVisible={setVisible}/>
        ) : (
          <MenuSider menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed}/>
        )
      }
      <Layout className="layout-admin" 
        style={{marginLeft: isTabletOrMobile ? "0px" : (menuCollapsed ? "80px" : "200px" )}}
      >
        <Content className="layout-admin__content">
            <LoadRouters routes={routes} setReloadUser={setReloadUser}/>
        </Content>
        <Header className="layout-admin__header">
          <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} setVisible={setVisible}/>
        </Header>
        <Footer className="layout-admin__footer">  
          <strong>
            Copyright &copy; 2020 <b style={{color: '#1890ff'}}>PIXIE</b> 
          </strong>
          <div>
            <Button type="link" href=" https://github.com/willjean29/GCM_PIXIE" target="_blank">
              <GithubOutlined/>
            </Button>
            <Button type="link" href=" https://www.facebook.com/pixiepoints" target="_blank">
              <FacebookOutlined/>
            </Button>
            <Button type="link" href="https://www.instagram.com/pixiepoints_oficial" target="_blank">
              <InstagramOutlined/>
            </Button>

          </div>
          <div>
            <b style={{color: '#1890ff'}}>Version</b> 1.0.0
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
}

function LoadRouters({routes,setReloadUser}) {  
  return (
    <Switch>
      {routes.map((route,index) => (
        <Route 
          key={index}
          path={route.path}
          exact={route.exact}
          render={(props) => (<route.component setReloadUser={setReloadUser} {...props}/>)}
        />
      ))}
    </Switch>
  );
}

export default LayoutAdmin;