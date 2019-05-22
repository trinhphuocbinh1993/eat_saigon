import React from 'react'

class Drinks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Drinks",
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

export default Drinks