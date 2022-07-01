import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonState: true,
      login: '',
      isLogged: false,
      buttonClicked: false,
    };
  }

  onChangeInput = ({ target }) => {
    const { name, value } = target;
    const numberOfChars = 3;
    this.setState({
      [name]: value,
    });
    if (value.length >= numberOfChars) {
      this.setState({ buttonState: false });
    } else {
      this.setState({ buttonState: true });
    }
  }

  createUserAux = () => {
    const { login } = this.state;
    this.setState({ buttonClicked: true });
    createUser({ name: login }).then(() => this.setState({ isLogged: true }));
  }

  checkingClick = () => {
    const { buttonClicked } = this.state;
    if (buttonClicked === true) {
      return (
        <Loading />
      );
    }
  }

  render() {
    const { buttonState, login, isLogged } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            name="login"
            data-testid="login-name-input"
            type="text"
            placeholder="Digite seu nome"
            onChange={ this.onChangeInput }
            value={ login }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ buttonState }
            onClick={ this.createUserAux }
          >
            Entrar
          </button>
          {
            isLogged ? <Redirect to="/search" /> : this.checkingClick()
          }
        </form>
      </div>
    );
  }
}

export default Login;
