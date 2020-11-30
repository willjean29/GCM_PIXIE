import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Layout} from 'antd';

const LayoutClient = (props) => {
  const {routes} = props;
  const {Header, Content, Footer} = Layout;
  return (  
    <Layout>
      {/* <h2>Menu Sidebar USER</h2> */}
      <Layout>
        {/* <Header>
          Header ...
        </Header> */}
        <Content>
          <LoadRouters routes={routes}/>
        </Content>
        {/* <Footer>  
          Footer ...
        </Footer> */}
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
  )
}
 
export default LayoutClient;