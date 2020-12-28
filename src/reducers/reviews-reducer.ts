import * as actionType from "../actions/action-type";

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionType.REVIEWS_LIST_BY_HOTEL_ID:
      const { reviews, hotel_id } = payload;
      return {
        ...state,
        [hotel_id]: reviews,
      };

    default:
      return state;
  }
};

export default reducer;
