import React from 'react'
import Appetisers from './Appetisers'
import MainDishes from './MainDishes'
import Special from './Special'
import Lunch from './Lunch'
import Drinks from './Drinks'
import { Tabs, Tab } from 'react-bootstrap'

class ControlledTabs extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: 'controlledtabs',
        };
    }

    render() {
        return (
            <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={key => this.setState({ key })}
            >
                <Tab eventKey="appetisers" title="Appetisers">
                    <Appetisers />
                </Tab>
                <Tab eventKey="maindishes" title="Main Dishes">
                    <MainDishes />
                </Tab>
                <Tab eventKey="special" title="Special">
                    <Special />
                </Tab>
                <Tab eventKey="lunch" title="Lunch">
                    <Lunch />
                </Tab>
                <Tab eventKey="drinks" title="Drinks">
                    <Drinks />
                </Tab>
            </Tabs>
        );
    }
}


export default ControlledTabs