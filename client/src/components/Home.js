import React from 'react'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Home",
            users: "",
            message: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        const token = localStorage.getItem("user");
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
            if(json.message){
                if(json.message === "You need to login again"){
                    this.props.history.push("/login");
                } else {
                    this.setState({
                        message: json.message
                    })
                    this.props.history.push("/");
                }
            }
        });
    }

    handleSubmit(event) {
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
        })  
        .then(() => {this.props.history.push("/")})
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

export default Home