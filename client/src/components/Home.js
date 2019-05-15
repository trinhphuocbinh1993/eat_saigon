import React from 'react'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Home",
            users: "",
        }
    }
    componentDidMount() {
        const token = localStorage.getItem("user");
        console.log('home '+ token);
        //const data = '{token:"'+token+'"}';
       // const jsonData = JSON.stringify(data);
//console.log(jsonData);
        fetch("http://localhost:3002/api/users/check", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token)
        }).then(res => res.json()).then(json => console.log(json));
    }
    render() {
        return (
            <div>
                 <h1>{this.state.users}</h1>
            <h1>Hello Im {this.state.name}</h1>
            </div>
        )
    }
}

export default Home