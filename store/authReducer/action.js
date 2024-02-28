export const authActionTypes = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  SILENT_LOGIN: "SILENT_LOGIN",
};

export const loginRequest = () => (dispatch) => {
  dispatch({ type: authActionTypes.LOGIN_REQUEST });
};

export const loginSuccess = (user) => (dispatch) => {
  dispatch({ type: authActionTypes.LOGIN_SUCCESS, payload: user });
};

export const loginFailed = () => (dispatch) => {
  dispatch({ type: authActionTypes.LOGIN_FAILURE });
};

export const logout = () => (dispatch) => {
  dispatch({ type: authActionTypes.LOGOUT });
};

export const silentLogin = (user) => (dispatch) => {
  dispatch({ type: authActionTypes.SILENT_LOGIN, payload: user });
};
