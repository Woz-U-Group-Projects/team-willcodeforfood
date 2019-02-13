const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateTruckProfileInput = require("../../validation/truckprofile");

// Load Profile Model
const Truck = require("../../models/Truck");
// Load User Profile
const User = require("../../models/User");

// @route   GET api/truckprofile/test
//@desc     Tests truckprofile route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/truck
//@desc     Get current truck profile
//@access   private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Truck.findOne({ user: req.user.id })
      .then(truck => {
        if (!truck) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(truck);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
//@desc     Create or edit user profile
//@access   private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTruckProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.avatar) profileFields.avatar = req.body.avatar;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.title) profileFields.title = req.body.title;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.open) profileFields.open = req.body.open;
    if (req.body.close) profileFields.close = req.body.close;
    if (req.body.description) profileFields.description = req.body.description;
    // Menu items - Split into Array
    if (typeof req.body.menu !== "undefined") {
      profileFields.menu = req.body.menu.split(",");
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Truck.findOne({ user: req.user.id }).then(truck => {
      if (truck) {
        //update
        Truck.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(truck => res.json(truck));
      } else {
        // Create

        // Check if handle exists
        Truck.findOne({ handle: profileFields.handle }).then(truck => {
          if (truck) {
            errors.handle = "Handle already exists";
            res.status(400).json(errors);
          }

          // Save Truck Profile
          new Truck(profileFields).save().then(truck => res.json(truck));
        });
      }
    });
  }
);
module.exports = router;
