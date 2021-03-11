import React, { Component } from "react";
import BlogsDisplay from "../../WidgetsUI/BlogsDisplay/blogsDisplay";
import Loading from "../../WidgetsUI/Loading/loading";
import "./myblogs.css";

import { connect } from "react-redux";
import { getMyBlogs } from "../../actions/blog_actions";
import { bindActionCreators } from "redux";

class MyBlogs extends Component {
  state = {
    loading: true,
  };

  componentWillMount() {
    this.props.getMyBlogs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.blogs?.success === false) {
      alert("Something went wrong!");
      return;
    }

    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) return <Loading />;

    return (
      <div className="myblogs-contain">
        <h1 className="heading">My Blogs</h1>
        <BlogsDisplay
          blogs={this.props.blogs ? this.props.blogs.blogs : []}
          userBlogs={true}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.blog,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ getMyBlogs }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyBlogs);
