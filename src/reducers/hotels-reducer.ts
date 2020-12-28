import * as actionType from "../actions/action-type";

const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case actionType.HOTELS_LIST:
      return payload;

    case actionType.HOTEL_ADD:
      return [...state, payload];

    case actionType.HOTEL_REMOVE:
      return state.filter((hotel) => hotel.id !== payload.id);

    default:
      return state;
  }
};

export default reducer;
