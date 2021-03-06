import React from 'react'
import {withRouter} from 'react-router-dom'

class LogOut extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
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
                    localStorage.removeItem('userid');
                    this.props.history.push("/");
                } else {
                    alert(res.json.message)
                }
            }

            )
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <button>Sign out</button>
            </form>
        )
    }
}

export default withRouter(LogOut)