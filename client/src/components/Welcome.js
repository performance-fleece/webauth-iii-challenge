import React from 'react';
// import { withRouter } from 'react-router-dom';

class Welcome extends React.Component {
  logoutHandler() {
    this.props.logout();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="welcome-wrapper">
        <p>Welcome Page</p>
        {this.props.loggedIn ? (
          <button onClick={() => this.logoutHandler()}>Logout</button>
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}

export default Welcome;

// export default withRouter(Welcome);
