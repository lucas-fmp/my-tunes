import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);

    this.state = {
      isLoading: true,
      name: '',
      image: '',
      description: '',
      email: '',
      buttonState: false,
      redirect: false,
    };
  }

  async componentDidMount() {
    const userData = await getUser();
    await this.setState({
      isLoading: false,
      name: userData.name,
      image: userData.image,
      description: userData.description,
      email: userData.email,
      buttonState: false,
      redirect: false,
    }, () => {
      this.setState({ buttonState: this.checkingInputs() });
    });
  }

  onChangeHandler = ({ target }) => {
    const { value } = target;
    this.setState({
      [target.name]: value,
    }, () => {
      this.setState({ buttonState: this.checkingInputs() });
    });
  }

  onClick = async () => {
    this.setState({ isLoading: true });
    const { name, email, image, description } = this.state;
    const updatedData = {
      name,
      email,
      image,
      description,
    };
    await updateUser(updatedData);
    this.setState({ redirect: true, isLoading: false });
  }

  checkingInputs = () => {
    const { name, image, description, email } = this.state;
    if (name
      && image
      && description
      && email) {
      return false;
    }
    return true;
  }

  render() {
    const {
      isLoading, name, email, description, image, buttonState, redirect,
    } = this.state;
    if (redirect) return <Redirect exact to="/profile" />;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          isLoading ? <Loading /> : (
            <form>
              <label htmlFor={ name }>
                Nome
                <input
                  data-testid="edit-input-name"
                  id={ name }
                  value={ name }
                  name="name"
                  onChange={ this.onChangeHandler }
                />
              </label>
              <br />
              <label htmlFor={ email }>
                Email
                <input
                  type="email"
                  data-testid="edit-input-email"
                  id={ email }
                  value={ email }
                  name="email"
                  onChange={ this.onChangeHandler }
                />
              </label>
              <br />
              <label htmlFor={ description }>
                Descrição
                <input
                  data-testid="edit-input-description"
                  id={ description }
                  value={ description }
                  name="description"
                  onChange={ this.onChangeHandler }
                />
              </label>
              <br />
              <label htmlFor={ image }>
                Imagem
                <input
                  data-testid="edit-input-image"
                  id={ image }
                  value={ image }
                  name="image"
                  onChange={ this.onChangeHandler }
                />
              </label>
              <br />
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ buttonState }
                onClick={ this.onClick }
              >
                Salvar alterações
              </button>
            </form>
          )
        }
      </div>
    );
  }
}

export default ProfileEdit;
