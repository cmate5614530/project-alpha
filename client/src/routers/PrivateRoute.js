import React from 'react';
import { Route } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} component={(props) => (
    <div>
       <Component {...props} />
      
    </div>
  )} />
);
export default PrivateRoute;
