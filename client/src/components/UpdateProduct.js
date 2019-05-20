import React from 'react'
import Cleave from 'cleave.js/react'

class UpdateProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            detail: '',
            category: '',
            price: '',
            status: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.onNumeralChange = this.onNumeralChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params["id"] !== null) {
            var productID = this.props.match.params["id"];
            console.log(productID, "tao nghi la cho nay")

            fetch('http://localhost:3002/api/products/details?id=' + productID, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson[0].id, "tao nghi la cho nay")
                    this.setState({
                        name: responseJson[0].name,
                        description: responseJson[0].description,
                        detail: responseJson[0].detail,
                        category: responseJson[0].category,
                        price: responseJson[0].price,
                        status: responseJson[0].status,
                    });
                    //alert(responseJson.data);
                    //this.props.history.push("/admin");
                })
        } else {
            this.setState({
                name: "",
                description: "",
                detail: "",
                category: "",
                price: "",
                status: false
        })
    }
}

    handleChange(event) {
        const { name, value, type, checked } = event.target
        //console.log(event.target);
        type === "checkbox" ?
            this.setState({
                [name]: checked
            })
            :
            this.setState({
                [name]: value
            })
    }

    onNumeralChange(event) {
        this.setState({ price: event.target.rawValue });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = this.state;
        const productID = this.props.match.params["id"];
        const userid = localStorage.getItem("userid")
        data.userid = userid

        //console.log(data)

        if (productID > 0) {

            data.productID = productID
            //update
            fetch('http://localhost:3002/api/products/update', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then((response) => response.json())
                .then((responseJson) => {
                    alert(responseJson.message);
                    this.props.history.push("/admin");
                })
        } else {
            // create
            console.log(data, "ahihi")
            fetch('http://localhost:3002/api/products/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),

            }).then((response) => response.json())
                .then((responseJson) => {
                    alert(responseJson.message);
                    this.props.history.push("/admin");
                })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Product name</label>
                <br />
                <input type="text" id="name" name="name" defaultValue={this.state.name} onChange={this.handleChange} />
                <br />
                <label htmlFor="description">Product description</label>
                <br />
                <textarea name="description" id="description" cols="50" rows="5" onChange={this.handleChange} value={this.state.description}></textarea>
                <br />
                <label htmlFor="detail">Product detail</label>
                <br />
                <textarea name="detail" id="detail" cols="50" rows="5" onChange={this.handleChange} value={this.state.detail}></textarea>
                <br />
                <label htmlFor="price">Price (£)</label>
                <br />
                <Cleave value={this.state.price} id="price" className="input-numeral" options={{ numeral: true, numeralThousandsGroupStyle: 'thousand' }} onChange={this.onNumeralChange} />
                <br />
                <label htmlFor="categories">Category</label>
                <br />

                <select name="category" onChange={this.handleChange} value={this.state.category}>
                    <option>-- Please choose --</option>
                    <option defaultValue="appetisers">Appetisers</option>
                    <option defaultValue="traditionalCrispyPancake">Traditional Crispy Pancake</option>
                    <option defaultValue="crispySpringRolls">Crispy Spring Rolls</option>
                    <option defaultValue="soup">Soup</option>
                    <option defaultValue="freshSummerRolls">Fresh Summer Rolls</option>
                    <option defaultValue="salads">Salads</option>
                    <option defaultValue="riceNoodleSoup">Rice Noodle Soup</option>
                    <option defaultValue="spicyRiceVermicelliSoup">Spicy Rice Vermicelli Soup</option>
                    <option defaultValue="wontonNoodleSoup">Wonton Noodle Soup</option>
                    <option defaultValue="steamedRice">Steamed Rice</option>
                    <option defaultValue="friedRice">Fried Rice</option>
                    <option defaultValue="riceVermicelliNoodles">Rice Vermicelli Noodles</option>
                    <option defaultValue="stirFriedUdonNoodles">Stir Fried Udon Noodles</option>
                    <option defaultValue="eggNoodles">Egg Noodles</option>
                    <option defaultValue="fish">Fish</option>
                    <option defaultValue="goat">Goat</option>
                    <option defaultValue="beef">Beef</option>
                    <option defaultValue="tofu">Tofu</option>
                    <option defaultValue="sweet&amp;SourSoup">Sweet &amp; Sour Soup</option>
                    <option defaultValue="clayPotCurry">Clay Pot Curry</option>
                    <option defaultValue="drink">Drink</option>
                </select>
                <br />
                <label htmlFor="status">Hide product?</label>
                <input type="checkbox" id="status" name="status" checked={this.state.status} onChange={this.handleChange} />
                <br />
                <input type="submit" value="Submit" />


            </form>
        )
    }
}

export default UpdateProduct