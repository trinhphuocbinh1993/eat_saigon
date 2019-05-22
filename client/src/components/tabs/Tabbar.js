import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import Appetisers from './Appetisers'
import MainDishes from './MainDishes'

class Tabbar extends React.Component {

    render() {
        return (
            <div>
                <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
                    <Tab eventKey="appetisers" title="Appetisers">
                        <Appetisers />
                    </Tab>
                    <Tab eventKey="maindishes" title="Main Dishes">
                        <MainDishes />
                    </Tab>
                </Tabs> 
            </div>
        )
    }


}

export default Tabbar