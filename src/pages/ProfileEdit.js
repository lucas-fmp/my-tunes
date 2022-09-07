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
      <div data-testid="page-profile-edit" className="text-center">
        <Header />
        {
          isLoading ? (
            <div className="container-fluid p-3 text-center">
              <Loading />
            </div>
          ) : (
            <form className="d-flex flex-column p-2 align-items-center">
              <label htmlFor={ name } className="d-flex flex-column gap-1 p-2 w-75">
                Nome
                <input
                  data-testid="edit-input-name"
                  id={ name }
                  value={ name }
                  name="name"
                  onChange={ this.onChangeHandler }
                  className="form-control d-block mx-auto"
                />
              </label>
              <label htmlFor={ email } className="d-flex flex-column gap-1 p-2 w-75">
                Email
                <input
                  type="email"
                  data-testid="edit-input-email"
                  id={ email }
                  value={ email }
                  name="email"
                  onChange={ this.onChangeHandler }
                  className="form-control d-block mx-auto"
                />
              </label>
              <label
                htmlFor={ description }
                className="d-flex flex-column gap-1 p-2 w-75"
              >
                Descrição
                <input
                  data-testid="edit-input-description"
                  id={ description }
                  value={ description }
                  name="description"
                  onChange={ this.onChangeHandler }
                  className="form-control d-block mx-auto"
                />
              </label>
              <label htmlFor={ image } className="d-flex flex-column gap-1 p-2 w-75">
                Imagem
                <input
                  data-testid="edit-input-image"
                  id={ image }
                  value={ image }
                  name="image"
                  onChange={ this.onChangeHandler }
                  className="form-control d-block mx-auto"
                />
              </label>
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ buttonState }
                onClick={ this.onClick }
                className="btn btn-light btn-block w-50 mt-3"
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
