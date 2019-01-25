import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

function fetchVisitors() {
  return fetch('/api/visitors').then(res => res.json());
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class AttendanceContainer extends Component {
  state = {
    visitors: [],
    checked: [],
    others: '0',
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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { visitors } = this.state;

    return (
      <div className="App">
        <header className="DateContainer">
          <TextField
            id="date"
            className="Date"
            type="date"
            defaultValue="2018-12-31"
            variant="outlined"
          />
        </header>
        <List className="List">
          {visitors.map(item => (
            <ListItem key={item._id} role={undefined} dense button onClick={this.handleToggle(item._id)}>
              <Checkbox
                checked={this.state.checked.includes(item._id)}
                className="p0"
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>

        <TextField
          id="others"
          label="Остальные"
          className={classes.textField}
          value={this.state.others}
          onChange={this.handleChange('others')}
          type="number"
          margin="normal"
          variant="outlined"
        />
        <br />
        <Button variant="contained" color="primary" className={classes.button}>
          Сохранить
          <Icon className={classes.rightIcon}>save</Icon>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(AttendanceContainer);
