import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteMenu } from "../../actions/profileActions";

class Menu extends Component {
  onDeleteClick(id) {
    this.props.deleteMenu(id);
  }

  render() {
    const Menu = this.props.menu.map(men => (
      <tr key={men._id}>
        <td>{men.avatar}</td>
        <td>{men.price}</td>
        <td>{men.title}</td>
        <td>{men.description}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, men._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Menu Items</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Price</th>
              <th>Title</th>
              <th>Description</th>
              <th />
            </tr>
            {Menu}
          </thead>
        </table>
      </div>
    );
  }
}

Menu.propTypes = {
  deleteMenu: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteMenu }
)(Menu);
