import React from 'react'
import { Container } from 'react-bootstrap'
import Tabs from './Tabbar'

class MainDishes extends React.Component {
    render() {
        return (
            <div>
            <Tabs />
            <Container>
                <div>Hello</div>
            </Container>
            </div>
        )
    }
}

export default MainDishes