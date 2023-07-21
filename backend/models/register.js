const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_verify: {
    type: Boolean,
    default: false,
  },
  is_admin: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
    default:"",
  }
});

module.exports = mongoose.model("usersignup", registerSchema);
