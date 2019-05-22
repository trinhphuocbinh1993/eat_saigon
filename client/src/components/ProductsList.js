import React from 'react'
class ProductsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: '',
            list: [],
        }
        //this.handleEdit = this.handleEdit.bind(this)
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
                console.log(data.results[33])
                if (data.message) {
                    alert(data.message)
                } else {
                    this.setState({
                        list: data.results
                    })

                }
            })
    }
    handleEdit(id) {
        //console.log(id);
        window.location = "/product/edit/" + id;
        //this.props.history.push("/product/edit/" + id);
    }

    handleDelete(id) {
        
        fetch("http://localhost:3002/api/products/delete?id=" + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
        .then((responseJson) => {
            alert(responseJson.message);
           window.location = "/admin";
        })
    }

    render() {
        return (
            <div>
                <h1>Products List</h1>
                <table>
                    <thead>
                        <tr>
                        <th>ID</th>
                            <th>User ID</th>
                            <th>Product name</th>
                            <th>Product description</th>
                            <th>Product detail</th>
                            <th>Price</th>
                            <th>Lunch Price</th>
                            <th>Created day</th>
                            <th>Updated day</th>
                            <th>State</th>
                            <th>Product Category</th>
                            <th>Product Tab</th>
                            <th>Vegetarian</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr></thead>
                    <tbody>
                        {this.state.list.map(listItem =>
                            <tr key={listItem.id}>
                            <td>{listItem.id}</td>
                                <td>{listItem.userid}</td>
                                <td>{listItem.name}</td>
                                <td>{listItem.description}</td>
                                <td>{listItem.detail}</td>
                                <td>{listItem.price}</td>
                                <td>{listItem.lunch_price}</td>
                                <td>{listItem.created}</td>
                                <td>{listItem.updated}</td>
                                <td>
                                    {(() => {
                                        switch (listItem.status) {
                                            case 0: return "On sale";
                                            case 1: return "Hidden";
                                            default: return "Hidden";
                                        }
                                    })()}
                                </td>
                               
                                <td>{listItem.category}</td>
                                <td>{listItem.tab}</td>
                                <td>
                                {(() => {
                                        switch (listItem.vegetarian) {
                                            case 0: return "No";
                                            case 1: return "Yes";
                                            default: return "No";
                                        }
                                    })()}
                                </td>
                                <td>
                                    <button className="btn btn-link" onClick={(id) => this.handleEdit(listItem.id)}>Edit</button>                                    
                                </td>
                                <td>
                                    <button className="btn btn-link" onClick={(id) => this.handleDelete(listItem.id)}>Delete</button>                                    
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductsList