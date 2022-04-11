import { SAVE_USER, SUM_ACTION, RESET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: 'Fulano',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      ...action.payload,
    };
  case SUM_ACTION:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: Number(state.assertions + 1),
    };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
    };
  default:
    return state;
  }
};

export default playerReducer;
