import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  messageFeedback = () => {
    const { assertions } = this.props;
    const minScore = 3;
    if (assertions < minScore) {
      return 'Could be better...';
    } if (assertions >= minScore) {
      return 'Well Done!';
    }
  }

  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { placar, name, email, assertions } = this.props;
    return (
      <div>
        <Header placar={ placar } name={ name } email={ email } />
        <section>
          <h3 data-testid="feedback-text">{ this.messageFeedback() }</h3>
          <p data-testid="feedback-total-score">{ placar }</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
        </section>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handlePlayAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleRanking }
        >
          Ranking
        </button>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  placar: state.player.score,
  email: state.player.gravatarEmail,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps, null)(Feedback);

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;
