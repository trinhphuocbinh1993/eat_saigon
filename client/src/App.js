import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Navbar from './components/layout/Navbar'
//import Test from './components/Test'
import Home from './components/Home'
import Contact from './components/Contact'
import Users from './components/Users'
import Page404 from './components/404'
import PostProduct from './components/PostProduct'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Admin from './components/Admin'
import PrivateRoute from './components/PrivateRoute'
import userService from './components/service/userService'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UpdateProduct from './components/UpdateProduct';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          {/* <Route path="/test" component={Test} /> */}
          <Route path="/users" component={Users} />
          <PrivateRoute path="/postproduct" component={PostProduct} onEnter={userService.requireAuth} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/admin/" component={Admin}  onEnter={userService.requireAuth}/>
          <PrivateRoute path="/admin/products/update" component={UpdateProduct}  onEnter={userService.requireAuth}/>
          <Route component={Page404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
