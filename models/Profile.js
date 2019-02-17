const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import './Profile.css';

// Created Schema
const UserProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  status: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  Social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", UserProfileSchema);
