import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";
import _ from "lodash";

import { Navbar, Nav } from "react-bootstrap";

const pageSize = 10;

class Auditpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { paginatedPosts: "" };
  }

  componentDidMount() {
    this.props.getUsers();
    // this.setState({
    //   paginatedPosts: _(PaginatedData).slice(0).take(pageSize).value(),
    // });
    // console.log(
    //   "Output data is",
    //   _(this.props.users.items).slice(0).take(pageSize).value()
    // );
  }

  handleDeleteUser(id) {
    return (e) => this.props.deleteUser(id);
  }

  render() {
    const { user, users } = this.props;
    const pageCount = users.items
      ? Math.ceil(users.items.length / pageSize)
      : 0;
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="#features">Auditor</Nav.Link>
            <Nav.Link>
              <Link to="/login">Logout</Link>
            </Nav.Link>
          </Nav>
        </Navbar>
        <div className="col-md-12" style={{ width: "100%" }}>
          <h1>Hi {user.firstName}!</h1>
          <p>You're logged in with React!!</p>
          <h3>All login audit :</h3>
          {users.loading && <em>Loading users...</em>}
          {users.error && (
            <span className="text-danger">ERROR: {users.error}</span>
          )}
          {users.items && (
            <table className="table col-md-12" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th> Id</th>
                  <th> Role </th>
                  <th> Created Date </th>
                  <th> First Name </th>
                  <th> Last Name </th>
                </tr>
              </thead>
              <tbody>
                {users.items.map((user, index) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.role}</td>
                    <td>{user.createdDate}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>
                      {user.deleting ? (
                        <em> - Deleting...</em>
                      ) : user.deleteError ? (
                        <span className="text-danger">
                          - ERROR: {user.deleteError}
                        </span>
                      ) : (
                        <span>
                          <a onClick={this.handleDeleteUser(user.id)}>Delete</a>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <nav className="d-flex justify-content-center col-md-offset-4">
          <ul className="pagination">
            {pages.map((page) => (
              <li className="page-link"> {page} </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

const connectedAuditPage = connect(mapState, actionCreators)(Auditpage);
export { connectedAuditPage as Auditpage };
