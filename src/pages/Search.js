import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputArtist: '',
      buttonState: true,
      fetchComplete: false,
      buttonClicked: false,
      artist: '',
      data: [],
    };
  }

  onChangeInput = ({ target }) => {
    const { name, value } = target;
    const numberOfChars = 2;
    this.setState({
      [name]: value,
    });
    if (value.length >= numberOfChars) {
      this.setState({ buttonState: false });
    } else {
      this.setState({ buttonState: true });
    }
  }

  onClick = () => {
    this.setState({ buttonClicked: true });
    const { inputArtist } = this.state;
    searchAlbumsAPI(inputArtist).then((data) => {
      this.setState({
        fetchComplete: true,
        artist: inputArtist,
        inputArtist: '',
        data,
      });
    });
  }

  checkingClick = () => {
    const { buttonClicked } = this.state;
    if (buttonClicked === true) {
      return (
        <Loading />
      );
    }
  }

  checkingDataContent = () => {
    const { data, artist } = this.state;
    if (data.length === 0) {
      return (
        <p>Nenhum álbum foi encontrado</p>
      );
    }
    return (
      <h3>
        Resultado de álbuns de:
        {' '}
        {artist}
        <ul>
          {data.map((element) => {
            const {
              artworkUrl100, artistName, collectionName, collectionId,
            } = element;
            return (
              <Link
                data-testid={ `link-to-album-${collectionId}` }
                to={ `/album/${collectionId}` }
                key={ collectionId }
              >
                <li>
                  <img src={ artworkUrl100 } alt={ collectionName } />
                  <h4>{collectionName}</h4>
                  <h6>{artistName}</h6>
                </li>
              </Link>
            );
          })}
        </ul>
      </h3>
    );
  }

  render() {
    const { inputArtist, buttonState, fetchComplete } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="inputArtist"
            type="text"
            data-testid="search-artist-input"
            onChange={ this.onChangeInput }
            value={ inputArtist }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonState }
            onClick={ this.onClick }
          >
            Buscar
          </button>
          {
            fetchComplete ? this.checkingDataContent() : this.checkingClick()
          }
        </form>
      </div>
    );
  }
}

export default Search;
