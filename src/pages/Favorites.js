import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    await this.setState({
      isLoading: false,
      favoriteSongs,
    });
  }

  updateFavorites = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
  }

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          isLoading ? <Loading /> : (
            favoriteSongs.map((track) => (
              <MusicCard
                key={ track.trackId }
                track={ track }
                favoriteSongs={ favoriteSongs }
                teste={ this.teste }
                updateFavorites={ this.updateFavorites }
              />
            ))
          )
        }
      </div>
    );
  }
}

export default Favorites;
