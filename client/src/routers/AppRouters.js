import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import EditorRoutes from './EditorRoutes';
//import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Main from '../Components/Layouts/Pages/Main';
import EditorLogin from '../Components/Layouts/Pages/EditorLogin';
import EditorReg from '../Components/Layouts/Pages/EditorReg';
import Products from '../Components/Layouts/Pages/Products';
import Services from '../Components/Layouts/Pages/Services';
import NotFoundPage from '../Components/Layouts/Pages/NotFoundPage';
import EditorDasboard from '../Components/Dashboard/Editor/Dashboard';

import EditorSlide from '../Components/Dashboard/Editor/Slide';
import ManageSector from '../Components/Dashboard/Editor/ManageSector';
import Quote from '../Components/Dashboard/Editor/Quote';
import Setting from '../Components/Dashboard/Editor/Setting';
import Finance from '../Components/Dashboard/Editor/Financ';

import Portfolio from '../Components/Dashboard/Editor/Portfolio';
import OurTeam from '../Components/Dashboard/Editor/OurTeam';
import News from '../Components/Dashboard/Editor/News';
import About from '../Components/Dashboard/Editor/About';
import Sectors from '../Components/Dashboard/Editor/Sectors';
import Message from '../Components/Dashboard/Editor/Message';
import ProductService from '../Components/Dashboard/Editor/ProductService';

export const history = createHistory();
class AppRouter extends React.Component {

  render() {
    return (
      <Router history={history} > 
        <div>
          <Switch>
            <PublicRoute path="/" component={Main} exact={true} />
            <PublicRoute path="/editor-login" component={EditorLogin} exact={true} />
            <PublicRoute path="/editor-reg" component={EditorReg} exact={true} />
            <PublicRoute path="/products" component={Products} exact={true} />
            <PublicRoute path="/services" component={Services} exact={true} />
            <EditorRoutes path="/editor-dasboard" component={EditorDasboard} exact={true} />

            <EditorRoutes path="/editor-slide" component={EditorSlide} exact={true} />
            <EditorRoutes path="/editor-managesector" component={ManageSector} exact={true} />
            <EditorRoutes path="/editor-message" component={Message} exact={true} />
            <EditorRoutes path="/editor-quote" component={Quote} exact={true} />
            <EditorRoutes path="/editor-setting" component={Setting} exact={true} />
            <EditorRoutes path="/editor-finance" component={Finance} exact={true} />


            <EditorRoutes path="/editor-portfolio" component={Portfolio} exact={true} />
            <EditorRoutes path="/editor-ourteam" component={OurTeam} exact={true} />
            <EditorRoutes path="/editor-news" component={News} exact={true} />
            <EditorRoutes path="/editor-about" component={About} exact={true} />
            <EditorRoutes path="/editor-sectors" component={Sectors} exact={true} />
            <EditorRoutes path="/editor-product-service" component={ProductService} exact={true} />

            <PublicRoute component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    )
  }
};
export default AppRouter;
