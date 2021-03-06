import React from 'react'
import LogOut from './LogOut';
import ProductsList from './ProductsList';

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Admin",
            users: "",
            message: ""
        }
    }
    componentDidMount() {
        const token = localStorage.getItem("user");
        if(!token)
            return;

        let t = {
            UserToken: token
        }
        fetch("http://localhost:3002/api/users/check", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(t)
        })
            .then((response) => response.json())
            .then(json => {
                if (json.message) {
                    if (json.message === "You need to login again") {
                        this.props.history.push("/login");
                    } else {
                        this.setState({
                            message: json.message
                        })
                        this.props.history.push("/admin");
                    }
                }
            });
    }


    render() {
        return (
            <div>
                <h1>{this.state.users}</h1>
                <h1>Hello Im {this.state.name}.{this.state.message}</h1>
                <br />
                <LogOut />
                <ProductsList />
            </div>
        )
    }
}

export default Admin