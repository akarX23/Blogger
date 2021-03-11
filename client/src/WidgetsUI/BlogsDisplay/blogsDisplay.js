import React from "react";
import BlogPreface from "../BlogPreface/blogPreface";
import "./blogsDisplay.css";

const BlogsDisplay = ({ blogs, userBlogs }) => {
  return (
    <div className="blogs-display-contain grid-cols-2">
      {blogs.map((blog, i) => (
        <BlogPreface key={i} {...blog} userBlog={userBlogs} />
      ))}
    </div>
  );
};

export default BlogsDisplay;
