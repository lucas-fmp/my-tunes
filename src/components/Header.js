import React from 'react';
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
        Header
        {dataObj === '' ? <Loading /> : (
          <p data-testid="header-user-name">
            Bem vindo,
            {' '}
            {name}
          </p>)}
      </header>
    );
  }
}

export default Header;
