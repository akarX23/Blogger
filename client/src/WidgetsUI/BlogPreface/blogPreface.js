import React from "react";
import "./blogPreafce.css";
import LikesHandler from "../LikesHandler/likesHandler";
import Moment from "react-moment";

const BlogPreface = ({
  title,
  updatedAt,
  content,
  author,
  likesCount,
  dislikesCount,
  _id,
  userBlog,
  likes,
  dislikes,
}) => {
  return (
    <div className="main-blog-preface">
      <div className="blog-preface-contain">
        <a href={`/blog/${_id}`}>
          <h1>{title}</h1>
          <p className="author">{author.name}</p>
          <p className="date">
            <Moment format="MMMM Do YYYY">{updatedAt}</Moment>
          </p>
          <p className="blog-body">{content}</p>
        </a>
      </div>
      {!userBlog ? (
        <LikesHandler
          blog={{ likesCount, dislikesCount, _id, likes, dislikes }}
        />
      ) : (
        <a href={`/blog/edit/${_id}`}>
          <div className="edit-blog">Edit Blog</div>
        </a>
      )}
    </div>
  );
};

export default BlogPreface;
