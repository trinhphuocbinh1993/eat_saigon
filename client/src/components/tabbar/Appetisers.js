import React from 'react'
import { Card, Button } from 'react-bootstrap'

class Appetisers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Appetisers",
        }

    }

    componentDidMount() {

        fetch("http://localhost:3002/api/products/appetisers", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.ok ? response.json() : null)
            // .then(data => {
            //     console.log(data.results)
            //     if (data.message) {
            //         alert(data.message)
            //     } else {
            //         this.setState({
            //             list: data.results
            //         })

            //     }
            // })
    }

    render() {
        return (
            <div>
                <h1>Hello Im {this.state.name}</h1>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="/img/com-tam-thom-ngon.jpg" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
    </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Appetisers