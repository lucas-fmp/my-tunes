import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../my-tunes-logo-white.png';
import '../styles/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonState: true,
      login: '',
      password: '',
      isLogged: false,
      buttonClicked: false,
    };
  }

  onChangeInput = ({ target }) => {
    const { login, password } = this.state;
    const { name, value } = target;
    const minNameLength = 3;
    const minPasswordLength = 7;
    this.setState({
      [name]: value,
    });
    if (login.length >= minNameLength && password.length >= minPasswordLength) {
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
    const { buttonState, login, isLogged, password } = this.state;
    return (
      <div
        className="login-container container-fluid p-5 text-center
        d-flex flex-column justify-content-center"
        data-testid="page-login"
      >
        <img
          src={ logo }
          alt="My Tunes Logo"
          className="login-image mx-auto d-block img-fluid mb-4"
        />
        <form className="login-form d-block mx-auto w-100 rounded-3">
          <input
            name="login"
            data-testid="login-name-input"
            type="text"
            placeholder="Digite seu nome"
            onChange={ this.onChangeInput }
            value={ login }
            className="form-control mb-3 mt-4 p-2 w-75 d-block mx-auto"
          />
          <input
            name="password"
            data-testid="login-password-input"
            type="password"
            placeholder="Digite sua senha"
            onChange={ this.onChangeInput }
            value={ password }
            className="form-control mb-3 mt-3 p-2 w-75 d-block mx-auto"
          />
          <div className="mb-3">
            {
              isLogged ? <Redirect to="/search" /> : this.checkingClick()
            }
          </div>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ buttonState }
            onClick={ this.createUserAux }
            className="btn btn-light btn-block mb-4 w-25"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
