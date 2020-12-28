import * as actionType from "../actions/action-type";

const initialState = {
  state: null,
  user: null,
};

const reducer = (storeState = initialState, { type, payload }) => {
  switch (type) {
    case actionType.AUTH_STATE_SIGNED_IN:
      return { ...storeState, state: payload };

    case actionType.AUTH_CREATE_ACCOUNT:
      return { ...storeState, user: payload };

    case actionType.AUTH_AUTHENTICATE_ACCOUNT:
      return { state: true, user: payload };

    default:
      return storeState;
  }
};

export default reducer;
