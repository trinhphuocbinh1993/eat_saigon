import React from 'react'
import ControlledTabs from '../components/tabbar/ControlledTabs'

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
            <ControlledTabs />
            </div>
        )
    }
}

export default Home