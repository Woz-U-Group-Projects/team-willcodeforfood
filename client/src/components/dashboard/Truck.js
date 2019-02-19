import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteTruck } from "../../actions/profileActions";

class Truck extends Component {
  onDeleteClick(id) {
    this.props.deleteTruck(id);
  }

  render() {
    const Truck = this.props.Truck.map(tru => (
      <tr key={tru._id}>
        <td>{tru.title}</td>
        <td>{tru.location}</td>
        <td>{tru.hours}</td>
        <td>
          <Moment format="YYYY/MM/DD">{tru.from}</Moment> -
          {tru.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{tru.to}</Moment>
          )}
        </td>
        <td>{tru.description}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, tru._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Truck Description</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Hours</th>
              <th>Description</th>
              <th />
            </tr>
            {Truck}
          </thead>
        </table>
      </div>
    );
  }
}

Truck.propTypes = {
  deleteTruck: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteTruck }
)(Truck);
