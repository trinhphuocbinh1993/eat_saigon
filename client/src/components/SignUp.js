import React from "react"

class SignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",

            message: "",
            firstNameErr: "",
            lastNameErr: "",
            emailErr: "",
            passwordErr: "",
            confirmPasswordErr: ""
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

        fetch('http://localhost:3002/api/users/signup', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(resJson => {
                if (resJson.message) {
                    alert(resJson.message)
                    this.props.history.push("/login");
                }
                if (resJson.firstNameErr) {
                    this.setState({
                        firstNameErr: resJson.firstNameErr,
                    })
                }
                if (resJson.lastNameErr) {
                    this.setState({
                        lastNameErr: resJson.lastNameErr,
                    })
                }
                if (resJson.emailErr) {
                    this.setState({
                        emailErr: resJson.emailErr,
                    })
                }
                if (resJson.passwordErr) {
                    this.setState({
                        passwordErr: resJson.passwordErr,
                    })
                }
                if (resJson.confirmPasswordErr) {
                    this.setState({
                        confirmPasswordErr: resJson.confirmPasswordErr,
                    })
                }


            })
    }

    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>

                    <h6>{this.state.firstNameErr}</h6>
                    <label htmlFor="firstName">First name</label>
                    <br />
                    <input name="firstName" id="firstName" type="name" value={this.state.firstName} onChange={this.handleChange} />
                    <br />
                    <h6>{this.state.lastNameErr}</h6>
                    <label htmlFor="lastname">Last name</label>
                    <br />
                    <input name="lastName" id="lastName" type="name" value={this.state.lastName} onChange={this.handleChange} />
                    <br />
                    <h6>{this.state.emailErr}</h6>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input name="email" id="email" type="email" value={this.state.email} onChange={this.handleChange} />
                    <br />
                    <h6>{this.state.passwordErr}</h6>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input name="password" id="password" type="password" value={this.state.password} onChange={this.handleChange} />
                    <br />
                    <h6>{this.state.confirmPasswordErr}</h6>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <br />
                    <input name="confirmPassword" id="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange} />
                    <br />
                    <button type="submit">Submit</button>
                </form>
                <h1>firstname: {this.state.firstName}</h1>
                <h1>lastname: {this.state.lastName}</h1>
                <h1>email: {this.state.email}</h1>
                <h1>password: {this.state.password}</h1>
                <h1>confirmPassword: {this.state.confirmPassword}</h1>
            </div>
        )
    }
}

export default SignUp