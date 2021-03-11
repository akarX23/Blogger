const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: String,
    content: String,
    likes: [String],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likesCount: { type: Number, default: 0 },
    dislikesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

blogSchema.pre("find", function () {
  this.populate({
    path: "author",
    select: "-password -token  -__v",
  }).populate({
    path: "likes",
    select: "-password -token  -__v",
  });
});

blogSchema.pre("save", function (next) {
  this.populate({
    path: "author",
    select: "-password -token  -__v",
  })
    .execPopulate()
    .then(function () {
      next();
    });
});

blogSchema.statics.getAllBlogs = function (param, cb) {
  let blogs = this;
  let query = blogs.find();
  let sortParam = "";

  if (param === 0) sortParam = "updatedAt";
  else sortParam = "likesCount";

  query.sort({ [sortParam]: "desc" }).exec((err, blogs) => {
    if (err) return cb(err);
    return cb(null, blogs);
  });
};

module.exports = mongoose.model("Blogs", blogSchema);
