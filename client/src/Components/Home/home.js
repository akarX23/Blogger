import React, { Component } from "react";
import BlogsDisplay from "../../WidgetsUI/BlogsDisplay/blogsDisplay";
import SortingButton from "../../WidgetsUI/SortingButton/sorting-button";
import Loading from "../../WidgetsUI/Loading/loading";
import "./home.css";

import { connect } from "react-redux";
import { getAllBlogs } from "../../actions/blog_actions";
import { bindActionCreators } from "redux";

class Home extends Component {
  state = {
    recentPressed: true,
    loading: true,
  };

  changeBlogs = () => {
    this.props.getAllBlogs(this.state.recentPressed === true ? 1 : 0);
    this.setState({ recentPressed: !this.state.recentPressed, loading: true });
  };

  renderSortButtons = () => {
    return (
      <div className="sort-button-container">
        <SortingButton
          text="Most Recent"
          pressed={this.state.recentPressed}
          onPress={this.changeBlogs}
        />
        <SortingButton
          text="Most Liked"
          pressed={!this.state.recentPressed}
          onPress={this.changeBlogs}
        />
      </div>
    );
  };

  componentWillMount() {
    this.props.getAllBlogs(0);
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
      <div className="home-contain">
        {this.renderSortButtons()}
        <BlogsDisplay blogs={this.props.blogs ? this.props.blogs.blogs : []} />
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
  ...bindActionCreators({ getAllBlogs }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
