import React, { Component } from 'react';
import './App.css';

function fetchAttendance() {
  return fetch('/api/attendance').then(res => res.json());
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendance: [],
    };
  }

  componentDidMount() {
    fetchAttendance().then(response => {
      this.setState({
        attendance: response,
      });
    });
  }

  render() {
    const { attendance } = this.state;

    return (
      <div className="App">
        <ul>
          {attendance.map(item => (
            <li key={item._id}>
              {new Date(item.date).toLocaleDateString('en-GB')} было {item.total} чел.
              <ul>
                {item.visitors.map(item => (
                  <li>{item.name}</li>  
                ))}
                <li>Остальные: {item.others} чел.</li>
              </ul>  
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
