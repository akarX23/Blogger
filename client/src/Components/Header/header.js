import React, { Component } from "react";
import NavItem from "../../WidgetsUI/NavItem/nav-item";
import AuthButton from "../../WidgetsUI/AuthButtons/authButtons";

import "./header.css";
import { connect } from "react-redux";

var links = [
  { link: "/", text: "Home" },
  { link: "/blogs/myblogs", text: "My Blogs" },
  { link: "/blogs/create", text: "New Blog" },
];

var prevScrollPos = 0;

class Header extends Component {
  state = {
    showHeader: true,
  };

  getLinks = () => {
    return (
      <div className="nav-container">
        {this.props.auth.isAuth === true &&
          links.map((navlink, i) => <NavItem {...navlink} key={i} />)}
      </div>
    );
  };

  showAuthenticateButtons = () => {
    if (this.props.auth.isAuth === true) {
      return <AuthButton link="/logout" text="Log Out" />;
    }

    return <AuthButton link="/authenticate" text="Log In / Sign Up" />;
  };

  componentDidMount() {
    window.addEventListener("scroll", () => {
      var currentScrollPos = window.pageYOffset;

      if (currentScrollPos > prevScrollPos && this.state.showHeader === true)
        this.setState({ showHeader: false });
      else if (
        (currentScrollPos < prevScrollPos || currentScrollPos === 0) &&
        this.state.showHeader === false
      )
        this.setState({ showHeader: true });
      prevScrollPos = currentScrollPos;
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll");
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
  }

  render() {
    return (
      <div
        className={`header-container ${
          this.state.showHeader === false ? "headerHide" : "headerShow"
        }`}
      >
        <a href="/">
          <div className="logo">Blogger</div>
        </a>
        {this.getLinks()}
        {this.showAuthenticateButtons()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.user,
  };
};

export default connect(mapStateToProps)(Header);
