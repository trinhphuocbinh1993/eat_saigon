import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Navbar from './components/layout/Navbar'
import Test from './components/Test'
import Home from './components/Home'
import Contact from './components/Contact'
import Users from './components/Users'
import Page404 from './components/404'
import PostProduct from './components/PostProduct'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/contact" component={Contact} />
        <Route path="/test" component={Test} />
        <Route path="/users" component={Users} />
        <Route path="/postproduct" component={PostProduct} />
        <Route component={Page404} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
