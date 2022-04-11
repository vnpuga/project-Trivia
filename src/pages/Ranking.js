import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { ArrowBackIos } from '@material-ui/icons';
import { resetScore } from '../redux/actions';
import './ranking.css';

class Ranking extends Component {
  onLoginClick = () => {
    const { history, resetDispatch } = this.props;
    resetDispatch();
    history.push('/');
  };

  render() {
    const infoPlayer = JSON.parse(localStorage.getItem('players'))
      .sort((a, b) => b.score - a.score);
    console.log(infoPlayer);
    return (
      <div className="ranking-container">
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul className="ranking-list">
          {
            infoPlayer.map((player, index) => (
              <li key={ player } className="player-rank">
                <img src={ player.picture } alt={ player.name } />
                <p data-testid={ `player-name-${index}` }>
                  { player.name }
                </p>
                <p data-testid={ `player-score-${index}` }>
                  { player.score }
                </p>
              </li>
            ))
          }
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          className="btn-go-home"
          onClick={ this.onLoginClick }
        >
          Play again
          <ArrowBackIos className="arrow-back" fontSize="large" />
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

// const mapStateToProps = (state) => ({
//   name: state.player.name,
//   score: state.player.score,
//   email: state.player.gravatarEmail,
// });

const mapDispatchToProps = (dispatch) => ({
  resetDispatch: () => dispatch(resetScore()),
});

export default connect(null, mapDispatchToProps)(Ranking);
