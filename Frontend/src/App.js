import 'core-js/es/set'
import 'core-js/es/map'
import 'react-app-polyfill/ie9'

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import Home from './PageComponents/HomePage'
import Login from './PageComponents/Login';
import Destination from './PageComponents/Destination'
import Destinations from './PageComponents/Destinations'
import Facilities from './PageComponents/Facilities'
import Social from './PageComponents/Social'

function App() {
  //let auth_token = localStorage.getItem("auth_token")
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/destination" component={Destination} />
        <Route path="/destinations" component={Destinations} />
        <Route path="/facilities" component={Facilities} />
        <Route path="/social" component={Social} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
