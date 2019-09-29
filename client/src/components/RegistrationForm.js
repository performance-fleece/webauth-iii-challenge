import React from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      department: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newUser = this.state;
    this.props.addUser(newUser).then(() => this.props.history.push('/users'));
  };

  render() {
    return (
      <div className="login-wrapper">
        <h3>LoginForm</h3>
        <div className="login-form">
          <form>
            <label>User:</label>
            <input
              name="username"
              type="text"
              value={this.state.username}
              placeholder="username..."
              onChange={this.handleChange}
            />
            <label>Password:</label>
            <input
              name="password"
              type="password"
              value={this.state.password}
              placeholder="password..."
              onChange={this.handleChange}
            />
            <label>Department:</label>
            <input
              name="department"
              type="text"
              value={this.state.department}
              placeholder="Department..."
              onChange={this.handleChange}
            />
            <button onClick={this.handleSubmit}>Register</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ addingUser }) => ({
  addingUser
});

export default connect(
  mapStateToProps,
  { addUser }
)(RegistrationForm);
