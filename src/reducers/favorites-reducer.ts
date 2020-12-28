import * as actionType from "../actions/action-type";
import config from "../config";

const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case actionType.FAVORITES_LIST:
      return payload.map((item) => {
        item.image = config.baseURL + item.image;
        return item;
      });

    case actionType.FAVORITES_LIST_UPDATE:
      return [...payload];

    case actionType.FAVORITE_ADD:
      return [...state, payload];

    case actionType.FAVORITE_REMOVE:
      return state.filter((favorite) => favorite.id !== payload);

    default:
      return state;
  }
};

export default reducer;
