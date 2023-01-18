const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  user: {
    type: String,
    trim: false,
  },

  password: {
    type: String,
    trim: false,
  },

  position: {
    type: String,
    trim: false,
  },
});

const usersModel = mongoose.model("usuarios", usersSchema);

module.exports = { usersModel };
