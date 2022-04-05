import { TOKEN_ACTION } from '../actions';

const INITIAL_STATE = {
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_ACTION:
    return action.payload;
  default:
    return state;
  }
};

export default tokenReducer;
