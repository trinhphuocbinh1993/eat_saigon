import React from 'react'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Home",
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

export default Home