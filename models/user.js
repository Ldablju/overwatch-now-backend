const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  tagName: { type: String, required: true },
  region: { type: String, required: true },
  email: { type: String, require: true },
  password: { type: String },

  notifications: { type: Array, default: []},
  messages: { type: Array, default: []},

  posts: { type: Array, default: [] },
  friends: { type: Array, default: [] },

  created: { type: String, default: Date.now().toLocaleString() },
});

module.exports = mongoose.model("user", userSchema);