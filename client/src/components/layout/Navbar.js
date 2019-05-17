import React from 'react'
import { Link } from "react-router-dom";
import userService from '../service/userService';


class Navbar extends React.Component {
    render() {
        return(
            <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          { (userService.isAuthenticated()) ? (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          ) : ""}
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
              <Link to="/postproduct">Post Product</Link>
          </li>
          <li>
              <Link to="/login">Log In</Link>
          </li>
          <li>
              <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
        )
    }
}

export default Navbar