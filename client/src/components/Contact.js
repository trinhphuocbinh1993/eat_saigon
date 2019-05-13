import React from 'react'

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Contact Page"
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit = () => {
        this.props.history.push('/')
      }

    render() {
        return (
            <div>
                <h1>Hello Im {this.state.name}</h1>
                <form>
                    <input placeholder="name" type="name" />
                    <input placeholder="email" type="email" />
                    <button onClick={this.onSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Contact