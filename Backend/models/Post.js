const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,

    },
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
     
    },
    categories: {
      type: Array,

    },
    profilePic:{   type: String,}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
