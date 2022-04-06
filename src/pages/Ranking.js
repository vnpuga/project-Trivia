import React, { Component } from 'react';
import Proptypes from 'prop-types';

class Ranking extends Component {
  onLoginClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const infoPlayer = localStorage.getItem('players');
    return (
      <div>
        <h1>Ranking</h1>
        <ul>
          {
            infoPlayer.sort((a, b) => b.score - a.score).map((player, index) => (
              <li key={ player }>
                <img src={ player.picture } alt={ player.name } />
                <p data-testid="player-name-${index}">
                  { player.name }
                </p>
                <p data-testid="player-score-${index}">
                  { player.score }
                </p>
              </li>
            ))
          }
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.onLoginClick }
        >
          Login
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func,
  }).isRequired,
};

export default Ranking;
