import React from 'react'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            errors: "",
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = this.state;

        fetch('http://localhost:3002/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => response.json())
        .then((responseJson) => {
        alert(responseJson.message);
        if(responseJson.token){
            alert(responseJson.token)
            localStorage.setItem('user', responseJson.token);
            this.props.history.push("/admin");
        }
        })
    }

    render() {
        return (
            <div>
                <div>{this.state.errors}</div>
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor="email">Email</label>
                    <br />
                    <input name="email" id="email" type="email" value={this.state.email} onChange={this.handleChange} />
                    <br />
                    <label htmlFor="password">Password</label>
                    <br />
                    <input name="password" id="password" type="password" value={this.state.password} onChange={this.handleChange} />
                    <br />
                    <button type="submit">Submit</button>
                </form>

                <h1>email: {this.state.email}</h1>
                <h1>password: {this.state.password}</h1>
            </div>
        )
    }
}

export default Login