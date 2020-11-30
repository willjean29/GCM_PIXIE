import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import {Provider} from 'react-redux';
import ES from 'antd/lib/locale/es_ES';
import 'moment/locale/es';
import routes from './config/routes';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider locale={ES}>
        <Router>
          <Switch>
            {routes.map((route, index) => (
              <RoutesWithSubRoutes key={index} {...route}/>
            ))}
          </Switch>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}

function RoutesWithSubRoutes (route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => (<route.component routes={route.routes} {...props}/>)}
    />
  );
}

export default App;
