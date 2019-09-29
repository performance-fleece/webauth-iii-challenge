import React from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Redirect } from 'react-router-dom';
import Welcome from './components/Welcome';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import UserList from './components/UserList';
import { connect } from 'react-redux';
import { login, logout } from './actions';
import PrivateRoute from './components/PrivateRoute';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Route
          path="/"
          render={props => (
            <Welcome
              {...props}
              loggedIn={this.props.loggedIn}
              logout={this.props.logout}
            />
          )}
        />
        <Route path="/register" component={RegistrationForm} />
        <Route path="/login" component={LoginForm} />
        <PrivateRoute path="/users" component={UserList} />
      </div>
    );
  }
}

const mapStateToProps = ({ loggedIn }) => ({ loggedIn });

export default connect(
  mapStateToProps,
  { logout }
)(App);
