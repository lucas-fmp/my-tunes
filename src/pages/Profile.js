import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <div data-testid="page-profile">
        <Header />
        {
          isLoading ? <Loading /> : (
            <div>
              <img data-testid="profile-image" src={ srcImage } alt={ name } />
              <p>{name}</p>
              <p>{email}</p>
              <p>{description}</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )
        }
      </div>
    );
  }
}

export default Profile;
