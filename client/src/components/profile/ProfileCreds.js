import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { truck, menu } = this.props;

    const truckItems = truck.map(tru => (
      <li key={tru._id} className="list-group-item">
        <p>
          <strong>Name:</strong> {tru.title}
        </p>
        <p>
          {tru.location === "" ? null : (
            <span>
              <strong>Location: </strong> {tru.location}
            </span>
          )}
        </p>
        <p>
          {tru.description === "" ? null : (
            <span>
              <strong>Description: </strong> {tru.description}
            </span>
          )}
          <h4>{tru.hours}</h4>
          <p>
            <Moment format="YYYY/MM/DD">{tru.from}</Moment> -
            {tru.to === null ? (
              " Now"
            ) : (
              <Moment format="YYYY/MM/DD">{tru.to}</Moment>
            )}
          </p>
        </p>
      </li>
    ));

    const menItems = menu.map(men => (
      <li key={men._id} className="list-group-item">
        <h4>{men.avatar}</h4>
        <p>
          <strong>Pricing:</strong> {men.price}
        </p>
        <p>
          <strong>Item:</strong> {men.title}
        </p>
        <p>
          {men.description === "" ? null : (
            <span>
              <strong>Description: </strong> {men.description}
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Truck</h3>
          {truckItems.length > 0 ? (
            <ul className="list-group">{truckItems}</ul>
          ) : (
            <p className="text-center">No Truck Listed</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Menu</h3>
          {menItems.length > 0 ? (
            <ul className="list-group">{menItems}</ul>
          ) : (
            <p className="text-center">No menu Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
