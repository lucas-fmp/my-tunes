import React from 'react';
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
    searchAlbumsAPI(inputArtist).then(() => {
      this.setState({
        fetchComplete: true,
        artist: inputArtist,
        inputArtist: '',
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

  render() {
    const { inputArtist, buttonState, fetchComplete, artist } = this.state;
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
            fetchComplete ? (
              <p>
                Resultado de álbuns de:
                {' '}
                {artist}
              </p>
            ) : this.checkingClick()
          }
        </form>
      </div>
    );
  }
}

export default Search;
