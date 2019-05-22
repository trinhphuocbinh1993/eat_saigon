import React from 'react'

class Special extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Special",
        }
        
    }
 


    render() {
        return (
            <div>
            <h1>Hello Im {this.state.name}</h1>
            </div>
        )
    }
}

export default Special