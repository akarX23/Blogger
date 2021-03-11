import React, { Component } from "react";
import "./blogPage.css";
import Loading from "../../WidgetsUI/Loading/loading";
import Moment from "react-moment";

import { connect } from "react-redux";
import { getBlog } from "../../actions/blog_actions";
import { bindActionCreators } from "redux";
import LikesHandler from "../../WidgetsUI/LikesHandler/likesHandler";

class BlogPage extends Component {
  state = {
    loading: true,
  };

  componentWillMount() {
    this.props.getBlog(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.blog?.success === false) {
      alert("Something went wrong!");
      return;
    }
    if (nextProps.blog?.success === true) this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) return <Loading />;

    return this.props.blog ? (
      <div className="blog-contain">
        <h1 className="blog-heading">{this.props.blog.blog.title}</h1>
        <div className="blog-info">
          <p>Author : {this.props.blog.blog.author.name}</p>
          <p>
            Date :
            <Moment format="MMMM Do YYYY">
              {this.props.blog.blog.updatedAt}
            </Moment>
          </p>
        </div>
        <p className="blog-page-body">{this.props.blog.blog.content}</p>
        <LikesHandler blog={this.props.blog.blog} />
      </div>
    ) : (
      <div></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.blog,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ getBlog }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);
