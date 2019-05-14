import React from 'react'
import Cleave from 'cleave.js/react'

class PostProduct extends React.Component {
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
        
        fetch('http://localhost:3002/api/product/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => res.json()).then(json => console.log(json));
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
                    <textarea name="description" id="description" cols="50" rows="5" onChange={this.handleChange} defaultValue={this.state.description}></textarea>
                    <br />
                    <label htmlFor="detail">Product detail</label>
                    <br />
                    <textarea name="detail" id="detail" cols="50" rows="5" onChange={this.handleChange} defaultValue={this.state.detail}></textarea>
                    <br />
                    <label htmlFor="price">Price (£)</label>
                    <br />
                    <Cleave id="price" className="input-numeral" options={{ numeral: true, numeralThousandsGroupStyle: 'thousand' }} onChange={this.onNumeralChange} />
                    <br />
                    <label htmlFor="categories">Category</label>
                    <br />
            
                    <select name="category" onChange={this.handleChange} value={this.state.category}>
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

export default PostProduct