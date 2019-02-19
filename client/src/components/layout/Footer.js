import React from "react";

export default () => {
  return (
    <footer className="bg-dark text-white py-5 p-4 text-center">
      <div className="row">
        <div className="col-4 col-md">
          <h5>SHOP</h5>
          <ul className="list-unstyled text-small">
            <li>
              <a className="text-muted" href="#">
                Find A Truck
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Schedule A Tour
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Custom Solutions
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Get a Quote
              </a>
            </li>
          </ul>
        </div>
        <div className="col-4 col-md">
          <h5>EXPLORE</h5>
          <ul className="list-unstyled text-small">
            <li>
              <a className="text-muted" href="#">
                Featured Products
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Future Products
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Our Mission
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Customer Stories
              </a>
            </li>
          </ul>
        </div>
        <div className="col-4 col-md">
          <h5>MORE</h5>
          <ul className="list-unstyled text-small">
            <li>
              <a className="text-muted" href="#">
                News Feed
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Careers
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Contact Us
              </a>
            </li>
            <li>
              <a className="text-muted" href="#">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-dark text-white py-5 p-4 text-center">
        Copyright &copy; {new Date().getFullYear()} GrubOnTheRun
      </div>
    </footer>
  );
};
