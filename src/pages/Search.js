import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputArtist: '',
      buttonState: true,
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

  render() {
    const { inputArtist, buttonState } = this.state;
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
          >
            Buscar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
