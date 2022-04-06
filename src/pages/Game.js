import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getTrivia } from '../services/apiRequest';

class Game extends Component {
  async componentDidMount() {
    const { token } = this.props;
    console.log(await getTrivia(token));
  }

  render() {
    const { placar, name, email } = this.props;
    return (
      <div>
        <Header placar={ placar } name={ name } email={ email } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  placar: state.player.score,
  email: state.player.gravatarEmail,
  token: state.token,
});

export default connect(mapStateToProps, null)(Game);

Game.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  placar: PropTypes.number,
}.isRequired;
