import React from 'react'
import Tabbar from '../components/tabs/Tabbar'
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
                <Tabbar />
            </div>
        )
    }
}

export default Home