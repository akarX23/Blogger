import React, { Component } from "react";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import IconButton from "@material-ui/core/IconButton";
import Loading from "../../WidgetsUI/Loading/loading";
import "./likesHandler.css";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { updateReview } from "../../actions/blog_actions";
import { bindActionCreators } from "redux";

class LikesHandler extends Component {
  state = { liked: false, disliked: false, blog: {} };

  hasUserInteracted = (arrayToCheck, blog) => {
    if (!this.props.user.isAuth) return false;

    let interact = blog[arrayToCheck];

    return interact.includes(this.props.user.user._id);
  };

  updateUserInteractions = (blog) => {
    let liked = this.hasUserInteracted("likes", blog),
      disliked = this.hasUserInteracted("dislikes", blog);

    return [liked, disliked];
  };

  sendLike = () => {
    if (!this.props.user.isAuth) this.props.history.push("/authenticate");

    this.setState({ loading: true }, () => {
      this.props.updateReview(!this.state.liked, false, this.props.blog._id);
    });
  };

  sendDisLike = () => {
    if (!this.props.user.isAuth) this.props.history.push("/authenticate");

    this.setState({ loading: true }, () => {
      this.props.updateReview(false, !this.state.disliked, this.props.blog._id);
    });
  };

  componentWillMount() {
    let review = this.updateUserInteractions(this.props.blog);
    this.setState({
      liked: review[0],
      disliked: review[1],
      blog: { ...this.props.blog },
    });
  }

  componentWillReceiveProps(nextProps) {
    let review = [this.state.liked, this.state.disliked];
    let newBlog = this.state.blog;
    if (nextProps.updated.update) {
      if (nextProps.updated.update.success === false)
        alert("Something went wrong!");
      else {
        review = this.updateUserInteractions(nextProps.updated.update.blog);
        newBlog = { ...nextProps.updated.update.blog };
      }
    }

    this.setState({
      liked: review[0],
      disliked: review[1],
      loading: false,
      blog: { ...newBlog },
    });
  }

  render() {
    if (this.state.loading) return <Loading />;

    return (
      <div className="blog-like-contain">
        <div className="blog-interact-pair">
          <IconButton onClick={this.sendLike}>
            <ThumbUpAltOutlinedIcon
              color={this.state.liked ? "primary" : "inherit"}
            />
          </IconButton>
          {this.state.blog.likesCount}
        </div>
        <div className="blog-interact-pair">
          <IconButton onClick={this.sendDisLike}>
            <ThumbDownAltOutlinedIcon
              color={this.state.disliked ? "primary" : "inherit"}
            />
          </IconButton>
          {this.state.blog.dislikesCount}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    updated: state.blog,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ updateReview }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LikesHandler));
