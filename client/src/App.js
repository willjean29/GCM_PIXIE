import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import routes from './config/routes';

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <RoutesWithSubRoutes key={index} {...route}/>
        ))}
      </Switch>
    </Router>
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
