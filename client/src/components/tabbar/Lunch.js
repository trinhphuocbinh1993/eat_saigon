import React from 'react'

class Lunch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Lunch",
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

export default Lunch