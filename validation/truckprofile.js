const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTruckProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to between 2 and 4 characters";
  }

  if (!Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  if (!Validator.isEmpty(data.status)) {
    errors.status = "Profile handle is required";
  }

  if (!Validator.isEmpty(data.title)) {
    errors.title = "Profile handle is required";
  }

  if (!Validator.isEmpty(data.location)) {
    errors.location = "Profile handle is required";
  }

  if (!Validator.isEmpty(data.open)) {
    errors.open = "Profile handle is required";
  }

  if (!Validator.isEmpty(data.close)) {
    errors.close = "Profile handle is required";
  }

  if (!Validator.isEmpty(data.description)) {
    errors.description = "Profile handle is required";
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
