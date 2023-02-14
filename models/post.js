const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, requiured: true },
    author: { type: String, required: true },
    video: { type: String, required: true },
    like: { type: Array, default: [] },
    comments: { type: Array, default: [] },
    created: { type: String, default: Date.now().toLocaleString() },
});

module.exports = mongoose.model("post", postSchema);