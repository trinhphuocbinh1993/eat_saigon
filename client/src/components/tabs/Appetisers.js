import React from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import Tabs from './Tabbar'
class Appetisers extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            list: [],
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
            .then(data => {
                console.log(data.results)
                if (data.message) {
                    alert(data.message)
                } else {
                    this.setState({
                        list: data.results
                    })

                }
            })
    }

    render() {
        return (
            <div>
                <Tabs />
                <Container>
                    
                        {this.state.list.map(item => 
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                          <Card.Title>{item.name}</Card.Title>
                          <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                          </Card.Text>
                          <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                      </Card>
 )}
                    
                </Container>
            </div>
        )
        }
}

export default Appetisers