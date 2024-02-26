import { authActionTypes } from "./action";

const initialState = {
  user: null,
  userRequestLoading: false,
  userLoginStatus: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN_REQUEST: {
      return {
        ...state,
        userLoginStatus: false,
        userRequestLoading: true,
      };
    }

    case authActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        userRequestLoading: false,
        userLoginStatus: true,
      };
    }

    case authActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        userLoginStatus: false,
        userRequestLoading: false,
      };
    }

    case authActionTypes.LOGOUT: {
      return {
        ...state,
        user: null,
        userLoginStatus: false,
      };
    }

    case authActionTypes.SILENT_LOGIN: {
      return {
        ...state,
        user: action.payload,
        userLoginStatus: true,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
