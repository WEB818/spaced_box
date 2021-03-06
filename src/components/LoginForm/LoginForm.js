import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Label } from "../Form/Form";
import AuthApiService from "../../services/auth-api-service";
import UserContext from "../../contexts/UserContext";
import Button from "../Button/Button";

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  };

  static contextType = UserContext;

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = ev => {
    ev.preventDefault();
    const { username, password } = ev.target;

    this.setState({ error: null });

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then(res => {
        username.value = "";
        password.value = "";
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;
    return (
      <form className="RegForm__container" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p>{error}</p>}</div>
        <div className="RegForm__label-input">
          <Label htmlFor="login-username-input">Username</Label>
          <Input
            ref={this.firstInput}
            id="login-username-input"
            className="red-input"
            name="username"
            required
          />
        </div>
        <div className="RegForm__label-input">
          <Label htmlFor="login-password-input">Password</Label>
          <Input
            id="login-password-input"
            className="green-input"
            name="password"
            type="password"
            required
          />
        </div>
        <footer className="RegForm__footer">
          <Button type="submit">Login</Button>Don't have an account?{" "}
          <Link to="/register" className="page-links">
            Sign up!
          </Link>
        </footer>
      </form>
    );
  }
}

export default LoginForm;
