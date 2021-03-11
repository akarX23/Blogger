const Blog = require("../Models/blog");
const { auth } = require("../Middlewares/auth");

module.exports = function (app) {
  ///POST
  app.post("/api/getblogs", (req, res) => {
    Blog.getAllBlogs(req.body.param, (err, blogs) => {
      if (err)
        return res.status(200).json({
          success: false,
          err,
        });

      return res.status(200).json({
        blogs,
        success: true,
      });
    });
  });

  app.post("/api/myblogs", auth, (req, res) => {
    Blog.find({ author: req.user._id })
      .sort({ ["updatedAt"]: "desc" })
      .exec((err, blogs) => {
        if (err)
          return res.status(200).json({
            success: false,
            err,
          });
        return res.status(200).json({
          success: true,
          blogs,
        });
      });
  });

  app.post("/api/createblog", auth, (req, res) => {
    const blog = new Blog({ ...req.body.blogData, author: req.user._id });
    blog.save((err, blog) => {
      if (err)
        return res.status(200).json({
          success: false,
          err,
        });

      return res.status(200).json({
        success: true,
        blog,
      });
    });
  });

  app.post("/api/editblog", auth, (req, res) => {
    let id = req.body.id;

    Blog.findOneAndUpdate(
      { _id: id, author: req.user._id },
      req.body.blogData,
      { new: true },
      (err, blog) => {
        if (err || !blog)
          return res.status(200).json({
            success: false,
            err,
          });

        return res.status(200).json({
          success: true,
          blog,
        });
      }
    );
  });

  app.post("/api/blog", (req, res) => {
    let id = req.body.id;

    Blog.find({ _id: id }, (err, blogs) => {
      if (err || !blogs)
        return res.status(200).json({
          success: false,
          err,
        });

      let blog = blogs[0];
      return res.status(200).json({
        success: true,
        blog,
      });
    });
  });

  app.post("/api/blog/delete", auth, (req, res) => {
    let id = req.body.id;

    Blog.deleteOne({ _id: id }, (err) => {
      if (err) return res.status(200).json({ success: false });
      return res.status(200).json({ success: true });
    });
  });

  app.post("/api/blog/interact", auth, (req, res) => {
    let id = req.body.id;
    let { liked, disliked } = req.body;
    let userid = req.user._id;

    Blog.findById(id, (err, blog) => {
      if (err || !blog)
        return res.status(200).json({
          success: false,
          err,
        });

      if (disliked === false) {
        blog.dislikes = blog.dislikes.filter(
          (uid) => `${userid}`.localeCompare(uid) !== 0
        );
      } else {
        console.log(userid);
        blog.dislikes.push(userid);
        // blog.dislikes = new Set(blog.dislikes);
        blog.dislikes = [...blog.dislikes];
        console.log(blog.dislikes);
      }

      if (liked === false) {
        blog.likes = blog.likes.filter(
          (uid) => `${userid}`.localeCompare(uid) !== 0
        );
      } else {
        blog.likes.push(userid);
        // blog.likes = new Set(blog.likes);
        blog.likes = [...blog.likes];
      }

      blog.likesCount = blog.likes.length;
      blog.dislikesCount = blog.dislikes.length;

      blog.save((err, blog) => {
        if (err)
          return res.status(200).json({
            success: false,
            err,
          });

        return res.status(200).json({
          success: true,
          blog,
        });
      });
    });
  });
};
