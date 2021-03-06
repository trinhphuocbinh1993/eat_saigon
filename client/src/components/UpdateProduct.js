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
            price: 0,
            lunch_price: 0,
            status: false,
            vegetarian: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.onNumeralChange = this.onNumeralChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
            var productID = this.props.match.params["id"];
            console.log(productID, "productID here")

            fetch('http://localhost:3002/api/products/details?id=' + productID, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson[0].id, "ID get from result at server")
                    this.setState({
                        name: responseJson[0].name,
                        description: responseJson[0].description,
                        detail: responseJson[0].detail,
                        category: responseJson[0].category,
                        price: responseJson[0].price,
                        lunch_price: responseJson[0].lunch_price ? responseJson[0].lunch_price : 0,
                        status: responseJson[0].status,
                        tab: responseJson[0].tab,
                        vegetarian: responseJson[0].vegetarian,
                    });
                    //alert(responseJson.data);
                    //this.props.history.push("/admin");
                })
        
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
        console.log(event.target)
        const { name, rawValue } = event.target
        console.log(name, rawValue)
        this.setState({
            [name]: rawValue
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = this.state;
        const productID = this.props.match.params["id"];
        const userid = localStorage.getItem("userid")
        data.userid = userid
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
                <Cleave value={this.state.price} name="price" id="price" className="input-numeral" options={{ numeral: true, numeralThousandsGroupStyle: 'thousand' }} onChange={this.onNumeralChange} />
                <br />
                <label htmlFor="price">Lunch Price (£)</label>
                <br />
                <Cleave value={this.state.lunch_price} name="lunch_price" id="lunch_price" className="input-numeral" options={{ numeral: true, numeralThousandsGroupStyle: 'thousand' }} onChange={this.onNumeralChange} />
                <br />
                <label htmlFor="categories">Category</label>
                <br />

                <select name="category" onChange={this.handleChange} value={this.state.category || ""}>
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
                
                <label htmlFor="tab">Tab</label>
                <br />
                <select name="tab" onChange={this.handleChange} value={this.state.tab}>
                    <option>-- Please choose --</option>
                    <option defaultValue="appetisers">Appetisers</option>
                    <option defaultValue="maindishes">Main Dishes</option>
                    <option defaultValue="ppecial">Special</option>
                    <option defaultValue="lunch">Lunch</option>
                    <option defaultValue="drinks">Drinks</option>
                </select>

                <br />
                <input type="checkbox" id="vegetarian" name="vegetarian" checked={this.state.vegetarian} onChange={this.handleChange} />
                <label htmlFor="vegetarian">Vegetarian?</label>

                <br />
                <input type="checkbox" id="status" name="status" checked={this.state.status} onChange={this.handleChange} />
                <label htmlFor="status">Hide product?</label>
                <br />
                <input type="submit" value="Submit" />

            </form>
        )
    }
}

export default UpdateProduct