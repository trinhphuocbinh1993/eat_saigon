import React from 'react'
import Cleave from 'cleave.js/react'

class PostProduct extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            price: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.onNumeralChange = this.onNumeralChange.bind(this);
    }

    handleChange(event) {
        const { name, value, type, checked } = event.target
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
        const data = new FormData(event.target);
        
        fetch('/api/product/create', {
          method: 'POST',
          body: data,
        });
      }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Product name</label>
                    <input id="name" name="name" value={this.state.name} onChange={this.handleChange}/>
                    

                    <label>Price (£)</label>
                <Cleave id="price" className="input-numeral" options={{ numeral: true, numeralThousandsGroupStyle: 'thousand' }} onChange={this.onNumeralChange} />
                    

                    <button>Submit</button>
                </form>

                <h2>product name is: {this.state.name}</h2>
                <h2>price is: {this.state.price}</h2>

            </div>
        )
    }
}

export default PostProduct