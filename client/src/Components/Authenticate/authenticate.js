import {
  Button,
  InputAdornment,
  TextField,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";

import { connect } from "react-redux";
import { login, signUp } from "../../actions/user_actions";
import { bindActionCreators } from "redux";

import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import Loading from "../../WidgetsUI/Loading/loading";
import "./authenticate.css";

const styles = (theme) => ({
  textfiled: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    width: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

class Authenticate extends Component {
  state = {
    showLogIn: true,
    email: "",
    password: "",
    name: "",
    loading: false,
  };

  changeForm = () => {
    return (
      <div
        className="change-form"
        onClick={() => this.setState({ showLogIn: !this.state.showLogIn })}
      >
        {this.state.showLogIn
          ? "New User? Sign Up here!"
          : "Exisiting user? Log In here!"}
      </div>
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.email !== "" && this.state.password !== "") {
      this.setState({ loading: true });
      if (this.state.showLogIn)
        this.props.login({
          email: this.state.email,
          password: this.state.password,
        });
      else {
        this.props.signUp({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        });
      }
    }
  };

  handleInputChange = (value, inputName) => {
    this.setState({ [inputName]: value });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
    if (nextProps.auth.isAuth === true) this.props.history.push("/");
    else if (
      nextProps.auth.emailNotFound === true ||
      nextProps.auth.mismatch === true
    )
      alert("Your credentials do not match!");
  }

  render() {
    const { classes } = this.props;

    if (this.state.loading) return <Loading />;

    return (
      <div className="authenticate-contain">
        <form className="form-contain" onSubmit={this.handleSubmit}>
          <p>
            {this.state.showLogIn
              ? "Welcome Back. Please Log In!"
              : "Enter your credentials below to Sign Up!"}
          </p>
          {!this.state.showLogIn && (
            <TextField
              classes={{
                root: classes.textfiled,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              label="Full Name"
              onChange={(event) =>
                this.handleInputChange(event.target.value, "name")
              }
            />
          )}
          <TextField
            classes={{
              root: classes.textfiled,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
            }}
            label="Email"
            type="email"
            onChange={(event) =>
              this.handleInputChange(event.target.value, "email")
            }
          />
          <TextField
            classes={{
              root: classes.textfiled,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            label="Password"
            type="password"
            onChange={(event) =>
              this.handleInputChange(event.target.value, "password")
            }
          />
          {this.changeForm()}
          <Button
            variant="contained"
            classes={{ root: classes.button }}
            color="primary"
            type="submit"
          >
            {this.state.showLogIn ? "Log In" : "Sign Up"}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ login, signUp }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Authenticate));
