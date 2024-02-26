export const productActionTypes = {
  PRODUCT: "PRODUCT",
};

export const fetchProducts = () => (dispatch) => {
  dispatch({
    type: productActionTypes.PRODUCT,
    productList: [],
  });
};
