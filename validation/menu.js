const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCompanyInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.avatar = !isEmpty(data.avatar) ? data.avatar : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.avatar)) {
    errors.avatar = "Image is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
