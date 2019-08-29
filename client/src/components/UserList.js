import React from 'react';
import { getUsers } from '../actions';
import { connect } from 'react-redux';
import UserCard from './UserCard';

class UserList extends React.Component {
  async componentDidMount() {
    this.props.getUsers(this.props.token);
  }

  render() {
    return (
      <div className="list-wrapper">
        {this.props.users ? (
          this.props.users.map(user => {
            return <UserCard user={user} />;
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ users, token }) => ({ users, token });

export default connect(
  mapStateToProps,
  { getUsers }
)(UserList);
