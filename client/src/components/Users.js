import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import '../../src/index.css'

const User = ({ match }) => <p>Im a user {match.params.id}</p>

class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Users"
        }
    }

    render() {
        console.log(this.props);
        
        return (
            <div>
                <h1>Hello Im {this.state.name}</h1>
                <strong>select a user</strong>
                <ul>
                    <li>
                        <NavLink activeClassName="active" to="/users/1">User 1</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/users/2">User 2</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/users/3">User 3</NavLink>
                    </li>
                </ul>
                <Route path="/users/:id" component={User} />
            </div>
        )
    }
}

export default Users