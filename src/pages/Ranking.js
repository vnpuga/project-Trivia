import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import gravatarUrl from '../services/gravatarUrl';

class Ranking extends Component {
  componentDidMount() {
    const { name, email, score } = this.props;
    const newPlayer = { name, score, picture: gravatarUrl(email) };
    const ranking = JSON.parse(localStorage.getItem('players'));
    if (ranking) {
      ranking.push(newPlayer);
      localStorage.setItem('players', JSON.stringify(ranking));
    } else {
      localStorage.setItem('players', JSON.stringify([newPlayer]));
    }
  }

  onLoginClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const infoPlayer = JSON.parse(localStorage.getItem('players'));
    console.log(infoPlayer);
    return (
      <div>
        <h1>Ranking</h1>
        <ul>
          { (infoPlayer)
            && infoPlayer.sort((a, b) => b.score - a.score).map((player, index) => (
              <li key={ player }>
                <img src={ player.picture } alt={ player.name } />
                <p data-testid={ `player-name-${index}` }>
                  { player.name }
                </p>
                <p data-testid={ `player-score-${index}` }>
                  { player.score }
                </p>
              </li>
            ))}
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
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Ranking);
