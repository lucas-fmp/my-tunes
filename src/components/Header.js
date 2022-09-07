import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import '../styles/header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      dataObj: '',
    };
  }

  componentDidMount() {
    getUser().then((data) => this.setState({ dataObj: data }));
  }

  render() {
    const { dataObj } = this.state;
    const { name, image } = dataObj;
    const srcImage = image !== '' ? image : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
    return (
      <header
        className="d-flex justify-content-between flex-row-reverse"
        data-testid="header-component"
      >
        <div className="p-3 d-flex align-items-center">
          {dataObj === '' ? <Loading /> : (
            <div className="d-flex align-items-center gap-3">
              <p className="name text-white" data-testid="header-user-name">
                {name}
              </p>
              <img src={ srcImage } alt="profile" className="rounded-circle header-img" />
            </div>
          )}
        </div>
        <nav
          className="p-3 navbar navbar-expand-sm navbar-dark"
        >
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <Link
                class="nav-link"
                data-testid="link-to-search"
                to="/search"
              >
                Buscar
              </Link>
            </li>
            <li className="nav-item">
              <Link
                class="nav-link"
                data-testid="link-to-favorites"
                to="/favorites"
              >
                Favoritos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                class="nav-link"
                data-testid="link-to-profile"
                to="/profile"
              >
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
