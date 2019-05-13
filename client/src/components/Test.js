import React from 'react';

class Test extends React.Component {
constructor(props) {
super(props);
this.state = {
    name: 'Unknown',
    age: props.age

}
}

componentDidMount() {
    fetch("http://localhost:3002/users")
    .then(response => response.json())
    .then(res => {
        this.setState({ name: res.name })
    })
}

render() {
    return (
        <div>
            <h1>Hello {this.state.name} </h1>
            <h2>Age {this.state.age}</h2>
        </div>
    )
}
}

export default Test