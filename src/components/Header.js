import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

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
    const { name } = dataObj;
    return (
      <header data-testid="header-component">
        {dataObj === '' ? <Loading /> : (
          <p data-testid="header-user-name">
            Bem vindo,
            {' '}
            {name}
          </p>)}
        <ul>
          <li>
            <Link data-testid="link-to-search" to="/search">Buscar</Link>
          </li>
          <li>
            <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          </li>
          <li>
            <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
