import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../actions/user_actions";
import { bindActionCreators } from "redux";

import Loading from "../WidgetsUI/Loading/loading";

export default function allowClass(ComposedClass, authUser) {
  class AuthenticationCheck extends Component {
    state = {
      loading: false,
    };

    componentWillMount() {
      this.props.auth();
    }

    componentWillReceiveProps(nextProps) {
      if (
        (nextProps.user.isAuth === false && authUser === true) ||
        (nextProps.user.isAuth === true && authUser === false)
      ) {
        this.props.history.push("/");
      }
      this.setState({ loading: false });
    }

    render() {
      if (this.state.loading) return <Loading />;

      return (
        <>
          <ComposedClass {...this.props} />
        </>
      );
    }
  }
  const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };

  const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ auth }, dispatch),
  });

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticationCheck);
}
