import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../styles/search.css';

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
        <div className="container-fluid p-3 text-center">
          <Loading />
        </div>
      );
    }
  }

  checkingDataContent = () => {
    const { data, artist } = this.state;
    if (data.length === 0) {
      return (
        <h4
          className="pt-4 text-center h3 fw-bold"
        >
          Nenhum álbum foi encontrado.
        </h4>
      );
    }
    return (
      <div className="result-container d-flex flex-column text-center">
        <h3 className="pt-4 text-center h3 fw-bold">
          Resultado de álbuns de:
          {' '}
          {artist}
        </h3>
        <ul className="d-flex flex-column align-items-center">
          {data.map((element) => {
            const {
              artworkUrl100, artistName, collectionName, collectionId,
            } = element;
            return (
              <Link
                data-testid={ `link-to-album-${collectionId}` }
                to={ `/album/${collectionId}` }
                key={ collectionId }
                className="rounded-3 w-75 p-4 card my-3"
              >
                <li>
                  <img
                    src={ artworkUrl100 }
                    alt={ collectionName }
                    className="img-thumbnail img-fluid mt-2"
                  />
                  <h4 className="h4 pt-2">{collectionName}</h4>
                  <h6 className="h6">{artistName}</h6>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    const { inputArtist, buttonState, fetchComplete } = this.state;
    return (
      <div data-testid="page-search" className="page-search">
        <Header />
        <form className="input-artist-container container-fluid py-3 d-flex gap-1">
          <input
            name="inputArtist"
            type="text"
            data-testid="search-artist-input"
            onChange={ this.onChangeInput }
            value={ inputArtist }
            className="form-control"
            placeholder="Digite o nome do artista, música ou banda"
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonState }
            onClick={ this.onClick }
            className="btn btn-light"
          >
            Buscar
          </button>
        </form>
        <div className="search-result-container">
          {
            fetchComplete ? this.checkingDataContent() : this.checkingClick()
          }
        </div>
      </div>
    );
  }
}

export default Search;
