import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Feedback extends Component {
  constructor() {
    super();
    this.state = ({
      assertions: 0,
      score: 10,
    });
  }

  messageFeedback = () => {
    const { assertions } = this.state;
    const minScore = 3;
    if (assertions < minScore) {
      return 'Could be better...';
    } if (assertions >= minScore) {
      return 'Well Done!';
    }
  }

  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/gameplay');
  }

  handleRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const {
      score,
      assertions,
    } = this.state;
    return (
      <div>
        <section>
          <h3 data-testid="feedback-text">{ this.messageFeedback() }</h3>
          <p data-testid="feedback-total-score">{ score }</p>
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

export default Feedback;

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
