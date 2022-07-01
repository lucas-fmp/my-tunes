import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonState: true,
      login: '',
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
    createUser({ name: login });
  }

  render() {
    const { buttonState, login } = this.state;
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
        </form>
      </div>
    );
  }
}

export default Login;
