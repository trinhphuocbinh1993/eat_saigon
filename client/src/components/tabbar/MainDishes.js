import React from 'react'

class MainDishes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Main Dishes",
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

export default MainDishes