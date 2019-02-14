const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCompanyInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.open = !isEmpty(data.open) ? data.open : "";
  data.close = !isEmpty(data.close) ? data.close : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }

  if (Validator.isEmpty(data.open)) {
    errors.open = "Opening hours is required";
  }

  if (Validator.isEmpty(data.close)) {
    errors.close = "Closing hours is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
