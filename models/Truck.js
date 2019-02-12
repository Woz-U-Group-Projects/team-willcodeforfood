const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TruckProfileSchema = new Schema({
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
  foodtruck: [
    {
      title: {
        type: String,
        require: true
      },
      location: {
        type: String
      },
      open: {
        type: Date
      },
      close: {
        type: Date
      },
      description: {
        type: String
      }
    }
  ],
  menu: [
    {
      title: {
        type: String,
        require: true
      },
      avatar: {
        type: String
      },
      description: {
        type: String,
        price: {
          type: String
        }
      }
    }
  ],
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
    },
    website: {
      type: String
    }
  },
  contact: {
    phone: {
      type: String
    },
    email: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("truckprofile", TruckProfileSchema);
