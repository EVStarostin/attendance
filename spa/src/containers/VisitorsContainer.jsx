import React, { Component } from 'react';

function fetchVisitors() {
  return fetch('/api/visitors').then(res => res.json());
}

class App extends Component {
  state = {
    visitors: [],
  };

  componentDidMount() {
    fetchVisitors().then(response => {
      this.setState({
        visitors: response,
      });
    });
  }

  render() {
    const { visitors } = this.state;

    return (
      <>
        <ul>
          {visitors.map(item => (
            <li key={item._id}>{item.name}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default App;