export const getIsLogged = (state) => state.authorization.islogged;

export const getUserName = (state) => state.authorization.user.name;

export const getIsFetchingCurrent = (state) =>
  state.authorization.isfetchingCurrentUser;

export const getError = (state) => state.authorization.error;

export const getToken = (state) => state.authorization.token;
