import { productActionTypes } from "./action";

const initialState = {
  productList: "",
  newData: "Data comming from redux product reducer",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case productActionTypes.PRODUCT:
      return Object.assign({}, state, {
        productList: action.productList,
      });
    default:
      return state;
  }
}
