import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gravatarUrl from '../services/gravatarUrl';

class Header extends Component {
  render() {
    const { placar, name, email } = this.props;
    return (
      <header>
        <p data-testid="header-player-name">
          {name}
        </p>
        <p data-testid="header-score">
          {placar}
          {' '}
        </p>
        <img
          data-testid="header-profile-picture"
          src={ gravatarUrl(email) }
          alt="Gravatar"
        />
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
