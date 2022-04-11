import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gravatarUrl from '../services/gravatarUrl';
import './header.css';

class Header extends Component {
  render() {
    const { placar, name, email } = this.props;
    return (
      <header className="game-header">
        <div className="player-info-container">
          <img
            data-testid="header-profile-picture"
            src={ gravatarUrl(email) }
            alt="Gravatar"
            className="gravatar"
          />
          <h2 data-testid="header-player-name">
            {name}
          </h2>
        </div>
        <h2 data-testid="header-score">
          Score:
          {' '}
          {placar}
        </h2>
      </header>

    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  placar: PropTypes.number,
}.isRequired;

export default Header;
