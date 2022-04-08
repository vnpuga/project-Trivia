export const TOKEN_ACTION = 'TOKEN_ACTION';

export const SAVE_USER = 'SAVE_USER';

export const SUM_ACTION = 'SUM_ACTION';

export const tokenAction = (payload) => ({
  type: TOKEN_ACTION,
  payload,
});

export const saveUser = (payload) => ({
  type: SAVE_USER,
  payload,
});

export const sumAction = (payload) => ({
  type: SUM_ACTION,
  payload,
});
