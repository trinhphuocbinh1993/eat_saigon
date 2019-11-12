import React from 'react'
import { Button, Form, Container } from 'react-bootstrap'

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
        this.emailError = this.emailError.bind(this)
        this.passwordError = this.passwordError.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    emailError(event) {

        event.preventDefault();
        //valid email
        if (!this.state.email) {
            this.setState({
                emailErr: "Type email please"
            })
        } else {
            this.setState({
                emailErr: ""
            })
        }
    }
    passwordError(event) {

        event.preventDefault();
        //valid password
        if (!this.state.password) {
            this.setState({
                passwordErr: "Type password please"
            })
        } else {
            this.setState({
                passwordErr: ""
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        if ((this.state.emailErr === "") && (this.state.passwordErr === "")) {
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
                    if (responseJson.token) {
                        alert(responseJson.token)
                        localStorage.setItem('user', responseJson.token);
                        localStorage.setItem('userid', responseJson.userid);
                        this.props.history.push("/admin");
                    }
                })
        }
    }

    render() {
        return (
            <div>
                <div>{this.state.errors}</div>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} onBlur={this.emailError} />
                            <Form.Text className="text-muted">
                                {this.state.emailErr ? this.state.emailErr : ""}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} onBlur={this.passwordError} />
                        </Form.Group>
                        <Form.Text className="text-muted">
                            {this.state.passwordErr ? this.state.passwordErr : ""}
                        </Form.Text>
                        <br/>
                        <Button variant="primary" type="submit">
                            Submit
  </Button>
                    </Form>
                </Container>



                {/* <form onSubmit={this.handleSubmit}>

                    <label htmlFor="email">Email</label>
                    <br />
                    <input name="email" id="email" type="email" value={this.state.email} onChange={this.handleChange} />
                    <br />
                    <label htmlFor="password">Password</label>
                    <br />
                    <input name="password" id="password" type="password" value={this.state.password} onChange={this.handleChange} />
                    <br />
                    <Button type="submit" variant="primary">Submit</Button>
                </form> */}

                <h1>email: {this.state.email}</h1>
                <h1>password: {this.state.password}</h1>
            </div>
        )
    }
}

export default Login