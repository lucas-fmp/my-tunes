import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      tracksInfo: [],
      artistInfo: [],
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
  }

  render() {
    const { tracksInfo, artistInfo } = this.state;
    const { artistName, collectionName } = artistInfo;
    return (
      <div data-testid="page-album">
        <Header />
        <h4 data-testid="artist-name">{artistName}</h4>
        <h6 data-testid="album-name">{collectionName}</h6>
        <MusicCard tracksInfo={ tracksInfo } />
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
