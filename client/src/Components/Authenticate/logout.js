import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/user_actions";
import { bindActionCreators } from "redux";
import Loading from "../../WidgetsUI/Loading/loading";

class Logout extends Component {
  state = {
    laoding: true,
  };

  componentWillMount() {
    this.props.logout();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
    this.props.history.push("/");
  }

  render() {
    if (this.state.laoding) return <Loading />;

    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ logout }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
