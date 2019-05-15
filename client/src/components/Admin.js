import React from 'react'

class Admin extends React.Component {
    constructor(){
        super()
        this.state = {
            name: "Admin Page"
        }
    }

    render() {
        return (
            <div>
                <h1>Welcome to {this.state.name}</h1>
            </div>
        )
    }
}

export default Admin