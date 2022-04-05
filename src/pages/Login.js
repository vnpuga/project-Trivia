import React, { Component } from 'react';

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
      </div>
    );
  }
}

export default Login;
