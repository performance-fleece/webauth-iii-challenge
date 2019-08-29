import React from 'react';
import './App.css';
import Header from './components/Header';
import { Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import UserList from './components/UserList';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route path="/" component={Welcome} />
        <Route path="/register" component={RegistrationForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/users" component={UserList} />
      </div>
    );
  }
}

export default App;
