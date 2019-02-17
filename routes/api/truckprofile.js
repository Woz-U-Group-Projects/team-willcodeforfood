const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateTruckProfileInput = require("../../validation/truckprofile");
const validateCompanyInput = require("../../validation/company");
const validateMenuInput = require("../../validation/menu");

// Load Profile Model
const Truck = require("../../models/Truck");
// Load User Profile
const User = require("../../models/User");

// @route   GET api/truckprofile/test
//@desc     Tests truckprofile route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Truck.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(truck => {
        if (!truck) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile/all
//@desc     Get all profiles
//@access   public
router.get("/all", (req, res) => {
  Truck.find()
    .populate("user", ["name", "avatar"])
    .then(truck => {
      if (!truck) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json();
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There is no profiles" }));
});

// @route   POST api/profile/handle/:handle
//@desc     Get profile by handle
//@access   public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Truck.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(truck => {
      if (!truck) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(truck);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile/user/:user_id
//@desc     Get profile by user ID
//@access   public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Truck.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(truck => {
      if (!truck) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(truck);
    })
    .catch(err =>
      res.status(404).json({ truck: "There is no profile for this user" })
    );
});

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

// @route POST api/profile/company
// @desc  Add company to truck profile
// @access Private
router.post(
  "/company",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCompanyInput(req.body);

    // Check Validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Truck.findOne({ user: req.user.id }).then(truck => {
      const newComp = {
        location: req.body.location,
        open: req.body.open,
        close: req.body.close,
        title: req.body.title,
        description: req.body.description
      };

      // Add to comp array
      truck.company.unshift(newComp);

      truck.save().then(truck => res.json(truck));
    });
  }
);

// @route POST api/profile/menu
// @desc  Add menu to truck profile
// @access Private
router.post(
  "/menu",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMenuInput(req.body);

    // Check Validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Truck.findOne({ user: req.user.id }).then(truck => {
      const newMenu = {
        title: req.body.title,
        avatar: req.body.avatar,
        description: req.body.description
      };

      // Add to Menu array
      truck.menu.unshift(newMenu);

      truck.save().then(truck => res.json(truck));
    });
  }
);

// @route DELETE api/profile/company/:comp_id
// @desc  Delete company from truck profile
// @access Private
router.delete(
  "/company/:comp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Truck.findOne({ user: req.user.id })
      .then(truck => {
        // Get remove index
        const removeIndex = truck.company
          .map(item => item.id)
          .indexOf(req.params.comp_id);

        // Splice out of array
        truck.company.splice(removeIndex, 1);

        // Save
        truck.save().then(truck => res.json(truck));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE api/profile/menu/:menu_id
// @desc  Delete menu items from truck profile
// @access Private
router.delete(
  "/menu/:menu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Truck.findOne({ user: req.user.id })
      .then(truck => {
        // Get remove index
        const removeIndex = truck.menu
          .map(item => item.id)
          .indexOf(req.params.comp_id);

        // Splice out of array
        truck.menu.splice(removeIndex, 1);

        // Save
        truck.save().then(truck => res.json(truck));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  DELETE api/profile
// @desc   Delete menu items from truck profile
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    truck.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);
module.exports = router;
