import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import BlogTemplate from "../../WidgetsUI/BlogTemplate/blogTemplate";
import Loading from "../../WidgetsUI/Loading/loading";
import "./createblog.css";

import { connect } from "react-redux";
import { createBlog } from "../../actions/blog_actions";
import { bindActionCreators } from "redux";

class CreateBlog extends Component {
  state = {
    title: "",
    content: "",
    loading: false,
  };

  handleInputChange = (value, inputName) => {
    this.setState({
      [inputName]: value,
    });
  };

  publish = () => {
    this.setState({ loading: true }, () =>
      this.props.createBlog({
        title: this.state.title,
        content: this.state.content,
      })
    );
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.blog.create?.success === false)
      alert("Something went wrong!");
    else if (nextProps.blog.create?.success === true)
      this.props.history.push("/blogs/myblogs");

    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) return <Loading />;

    return (
      <div className="new-blog-contain">
        <div className="new-blog-heading">
          <h1>Create your blog here.</h1>
          <Button variant="contained" color="primary" onClick={this.publish}>
            Publish
          </Button>
        </div>
        <BlogTemplate
          title={this.state.title}
          content={this.state.content}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blog: state.blog,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ createBlog }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog);
