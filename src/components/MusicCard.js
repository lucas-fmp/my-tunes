import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MusicCard extends Component {
  render() {
    const { tracksInfo } = this.props;
    return (
      <ul>
        {
          tracksInfo.map((track, index) => (
            <li key={ index }>
              <p>{track.trackName}</p>
              <audio data-testid="audio-component" src={ track.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
            </li>
          ))
        }
      </ul>
    );
  }
}

MusicCard.propTypes = {
  tracksInfo: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
