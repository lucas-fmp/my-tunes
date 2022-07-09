import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      tracksInfo: [],
      artistInfo: [],
      favoriteSongs: [],
      isGettingFavoriteSongs: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const gettingMusics = await getMusics(id);
    const artistInfo = gettingMusics[0];
    const tracksInfo = gettingMusics.slice(1);
    this.setState({
      artistInfo,
      tracksInfo,
    });
    const favoriteSongs = await getFavoriteSongs();
    await this.setState({
      favoriteSongs,
      isGettingFavoriteSongs: false,
    });
  }

  updateFavorites = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
  }

  render() {
    const { tracksInfo, artistInfo, isGettingFavoriteSongs, favoriteSongs } = this.state;
    const { artistName, collectionName } = artistInfo;
    return (
      <div data-testid="page-album">
        <Header />
        <h4 data-testid="artist-name">{artistName}</h4>
        <h6 data-testid="album-name">{collectionName}</h6>
        {
          isGettingFavoriteSongs ? <Loading /> : (
            tracksInfo
              .map((track) => (
                <MusicCard
                  key={ track.trackId }
                  track={ track }
                  favoriteSongs={ favoriteSongs }
                  updateFavorites={ this.updateFavorites }
                />
              ))
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
