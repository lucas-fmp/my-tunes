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
    console.log(userData);
    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoading ? <Loading /> : (
            <div>
              <img data-testid="profile-image" src={ image } alt={ name } />
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
