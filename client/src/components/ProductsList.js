import React from 'react'

class ProductsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            list: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {

        fetch("http://localhost:3002/api/products/list", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.ok ? response.json() : null)
            .then(data => {
                console.log(data.results[29].status.data[0])
                if (data.message) {
                    alert(data.message)
                } else {
                    this.setState({
                        list: data.results
                    })

                }
            })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.history.push("/admin/products/update");
    }

    render() {
        return (
            <div>
                <h1>Products List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Product name</th>
                            <th>Product description</th>
                            <th>Product detail</th>
                            <th>Price</th>
                            <th>Created day</th>
                            <th>Updated day</th>
                            <th>Product State</th>
                            <th>Product Category</th>
                            <th>Update</th>
                        </tr></thead>
                    <tbody>
                        {this.state.list.map(listItem =>
                            <tr key={listItem.id}>
                                <td>{listItem.userid}</td>
                                <td>{listItem.name}</td>
                                <td>{listItem.description}</td>
                                <td>{listItem.detail}</td>
                                <td>{listItem.price}</td>
                                <td>{listItem.created}</td>
                                <td>{listItem.updated}</td>
                                <td>
                                    {(() => {
                                        switch (listItem.status.data[0]) {
                                            case 0: return "On sale";
                                            case 1: return "Hidden";
                                            default: return "Hidden";
                                        }
                                    })()}
                                </td>
                               
                                <td>{listItem.category}</td>
                                <td><form onChange={this.handleSubmit}><button>Update</button></form></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductsList