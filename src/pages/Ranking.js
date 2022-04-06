import React, { Component } from 'react';
import Proptypes from 'prop-types';

class Ranking extends Component {
  onLoginClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
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
