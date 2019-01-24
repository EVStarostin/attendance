import React, { Component } from 'react';
// import ListControls from './components/ListControls/ListControls';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import './App.css';

// function fetchAttendance() {
//   return fetch('/api/attendance').then(res => res.json());
// }

function fetchVisitors() {
  return fetch('/api/visitors').then(res => res.json());
}

class App extends Component {
  state = {
    visitors: [],
    checked: [],
  };

  componentDidMount() {
    fetchVisitors().then(response => {
      this.setState({
        visitors: response,
      });
    });
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { visitors } = this.state;

    return (
      <div className="App">
        <header className="DateContainer">
          <TextField
            id="date"
            className="Date"
            type="date"
            defaultValue="2018-12-31"
          />
        </header>
        <List className="List">
          {visitors.map(item => (
            <ListItem key={item._id} role={undefined} dense button onClick={this.handleToggle(item._id)}>
              <Checkbox
                checked={this.state.checked.indexOf(item._id) !== -1}
                className="p0"
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
