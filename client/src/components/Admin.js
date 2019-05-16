import React from 'react'

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Admin",
            users: "",
            message: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
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

    handleSubmit(event) {
        event.preventDefault();
        const token = localStorage.getItem("user");
        let t = {
            UserToken: token
        }
        
        fetch("http://localhost:3002/api/users/signout", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(t)
        }).then((res) => {
                if (res.ok) {
                    console.log(res)
                    console.log("try to delete localStorage")
                    localStorage.removeItem('user');
                    this.props.history.push("/");
                } else {
                    alert(res.json.message)
                }
            }

            )
    }


    render() {
        return (
            <div>
                <h1>{this.state.users}</h1>
                <h1>Hello Im {this.state.name}.{this.state.message}</h1>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <button>Sign out</button>
                </form>
            </div>
        )
    }
}

export default Admin