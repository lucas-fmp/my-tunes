import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      userData: [],
    };
  }

  async componentDidMount() {
    const userData = await getUser();
    await this.setState({
      isLoading: false,
      userData,
    });
  }

  render() {
    const { userData, isLoading } = this.state;
    const { name, email, image, description } = userData;
    const srcImage = image !== '' ? image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
    return (
      <div data-testid="page-profile" className="profile-container">
        <Header />
        {
          isLoading ? (
            <div className="container-fluid p-3 text-center">
              <Loading />
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center gap-2 p-4">
              <img
                className="rounded-circle profile-img mb-3 img-fluid"
                data-testid="profile-image"
                src={ srcImage }
                alt={ name }
              />
              <p className="fw-bold">{name}</p>
              {
                email !== '' && <p>{email}</p>
              }
              {
                description !== '' && <p>{description}</p>
              }
              <Link
                to="/profile/edit"
                className="text-decoration-none profile-edit btn"
              >
                Editar perfil
              </Link>
            </div>
          )
        }
      </div>
    );
  }
}

export default Profile;
