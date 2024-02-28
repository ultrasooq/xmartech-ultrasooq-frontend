export const globalActionTypes = {
  TOGGLE_LOGIN_MODAL: "TOGGLE_LOGIN_MODAL",
  TOGGLE_REGISTER_MODAL: "TOGGLE_REGISTER_MODAL",
};

export const setModal = () => (dispatch) => {
  dispatch({
    type: globalActionTypes.TOGGLE_LOGIN_MODAL,
    type: globalActionTypes.TOGGLE_REGISTER_MODAL,
  });
};
export const editListEventData = (editEventData) => (dispatch) => {
  dispatch({
    type: globalActionTypes.EDIT_LIST_EVENT_DATA,
    payload: editEventData,
  });
};
