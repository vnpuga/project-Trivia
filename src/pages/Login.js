import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import getToken from '../services/apiRequest';
import { tokenAction } from '../redux/actions';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isPlayBtnDisabled: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validation);
  }

  validation = () => {
    const { name, email } = this.state;
    this.setState({
      isPlayBtnDisabled: !(name && email),
    });
  }

  onPlayBtnClick = async () => {
    const { tokenDispatch, history } = this.props;
    history.push('/gameplay');
    const token = await getToken();
    tokenDispatch(token);
  }

  onConfigClick = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, email, isPlayBtnDisabled } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="input-player-name"
          placeholder="Digite seu nome"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="input-gravatar-email"
          placeholder="Digite seu email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isPlayBtnDisabled }
          onClick={ this.onPlayBtnClick }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.onConfigClick }
        >
          <img
            className="config"
            src="https://cdn-icons-png.flaticon.com/512/15/15185.png"
            alt="config"
          />
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  tokenDispatch: (token) => (dispatch(tokenAction(token))),
});
export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
  tokenDispatch: Proptypes.func.isRequired,
};
