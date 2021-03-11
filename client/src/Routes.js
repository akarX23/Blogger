import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./hoc/layout";
import Auth from "./hoc/auth";

//COMPONENTS
import Home from "./Components/Home/home";
import MyBlogs from "./Components/My Blogs/myBlogs";
import Createblog from "./Components/CreateBlog/createblog";
import EditBlog from "./Components/Edit Blog/editBlog";
import BlogPage from "./Components/BlogPage/blogPage";
import Authenticate from "./Components/Authenticate/authenticate";
import Logout from "./Components/Authenticate/logout";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/blogs/myblogs" exact component={Auth(MyBlogs, true)} />
        <Route path="/blogs/create" exact component={Auth(Createblog, true)} />
        <Route path="/blog/edit/:id" exact component={Auth(EditBlog, true)} />
        <Route path="/blog/:id" exact component={Auth(BlogPage)} />
        <Route
          path="/authenticate"
          exact
          component={Auth(Authenticate, false)}
        />
        <Route path="/logout" exact component={Auth(Logout, true)} />
        <Route path="/" component={Auth(Home)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
