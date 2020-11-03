import React from 'react';
import {Layout, Tabs} from 'antd';
import Logo from '../../../assets/img/png/icon.png';
// import RegisterForm from '../../../components/Admin/RegisterForm';
import LoginForm from './components/LoginForm';

import './SingIn.scss';
const SingIn = () => {
  const {Content} = Layout;
  const {TabPane} = Tabs;
  return (  
    <Layout className="sing-in">
      <Content className="sing-in__content">
        <h1 className="sing-in__content-logo">
          <img src={Logo} alt="Agustin Navarro Galdon"/>
        </h1>
        <div className="sing-in__content-tabs">
          <Tabs type="card" hideAdd={false}>
            <TabPane tab={<span>Ingresar</span>} key="1">
              <LoginForm/>
            </TabPane>
            <TabPane tab={<span>Registrarse</span>} key="2">
              {/* <RegisterForm/> */}
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
 
export default SingIn;