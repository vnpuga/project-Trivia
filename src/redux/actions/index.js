export const TOKEN_ACTION = 'TOKEN_ACTION';

export const SAVE_USER = 'SAVE_USER';

export const tokenAction = (payload) => ({
  type: TOKEN_ACTION,
  payload,
});

export const saveUser = (payload) => ({
  type: SAVE_USER,
  payload,
});
