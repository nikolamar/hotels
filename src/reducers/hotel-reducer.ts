import * as actionType from "../actions/action-type";

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case actionType.HOTEL_BY_ID:
      const { details, hotel_id } = payload;
      return {
        ...state,
        [hotel_id]: details,
      };

    default:
      return state;
  }
};

export default reducer;
