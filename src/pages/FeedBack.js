import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ArrowBackIos } from '@material-ui/icons';
import Header from '../components/Header';
import { resetScore } from '../redux/actions';
import './feedBack.css';

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
    const { history, resetDispatch } = this.props;
    resetDispatch();
    history.push('/');
  }

  handleRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { placar, name, email, assertions } = this.props;
    return (
      <div className="feedback-container">
        <Header placar={ placar } name={ name } email={ email } />
        <section className="feedback">
          <h1 data-testid="feedback-text">{ this.messageFeedback() }</h1>
          <p data-testid="feedback-total-score">
            Your score is
            {' '}
            { placar }
            {'.'}
          </p>
          <p data-testid="feedback-total-question">
            You got
            {' '}
            { assertions }
            {' '}
            questions right!
          </p>
        </section>
        <div className="buttons-container">
          <button
            type="button"
            data-testid="btn-play-again"
            className="btn-play-again"
            onClick={ this.handlePlayAgain }
          >
            Play Again
            <ArrowBackIos className="arrow-back" fontSize="large" />
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            className="btn-ranking"
            onClick={ this.handleRanking }
          >
            Ranking
            <span role="img" aria-label="trophie">🏆</span>
          </button>
        </div>
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

const mapDispatchToProps = (dispatch) => ({
  resetDispatch: () => dispatch(resetScore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;
