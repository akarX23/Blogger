import { Button } from "@material-ui/core";
import React, { Component } from "react";
import BlogTemplate from "../../WidgetsUI/BlogTemplate/blogTemplate";
import Loading from "../../WidgetsUI/Loading/loading";
import "./edit-blog.css";

import { connect } from "react-redux";
import {
  getBlog,
  editBlog,
  deleteBlog,
  cleanUp,
} from "../../actions/blog_actions";
import { bindActionCreators } from "redux";

class EditBlog extends Component {
  state = {
    title: "",
    content: "",
    loading: true,
  };

  handleInputChange = (value, inputName) => {
    this.setState({
      [inputName]: value,
    });
  };

  componentWillMount() {
    this.props.getBlog(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.blog.blog) {
      if (
        nextProps.blog.blog.success === false ||
        nextProps.blog.edit?.success === false
      ) {
        alert("Something went wrong!");
        return;
      }

      if (
        nextProps.blog.edit?.success === true ||
        nextProps.blog.delete?.success === true
      )
        this.props.history.push("/blogs/myblogs");

      let { blog } = nextProps.blog.blog;

      this.setState({
        loading: false,
        title: blog.title,
        content: blog.content,
      });
    }
  }

  saveBlog = () => {
    if (this.state.title === "" || this.state.content === "") {
      alert("Fields are empty!");
      return;
    }
    this.setState({ loading: true }, () =>
      this.props.editBlog(
        {
          title: this.state.title,
          content: this.state.content,
        },
        this.props.match.params.id
      )
    );
  };

  deleteBlog = () => {
    this.setState({ loading: true }, () =>
      this.props.deleteBlog(this.props.match.params.id)
    );
  };

  componentWillUnmount() {
    this.props.cleanUp();
  }

  render() {
    if (this.state.loading) return <Loading />;

    return (
      <div className="edit-blog-contain">
        <div className="edit-blog-heading">
          <Button variant="contained" color="primary" onClick={this.saveBlog}>
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: 40 }}
            onClick={this.deleteBlog}
          >
            Delete
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
  ...bindActionCreators({ getBlog, editBlog, deleteBlog, cleanUp }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog);
