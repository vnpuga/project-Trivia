import { SAVE_USER, SUM_ACTION } from '../actions';

const INITIAL_STATE = {
  name: '',
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
  default:
    return state;
  }
};

export default playerReducer;
