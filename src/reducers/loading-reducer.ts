import * as actionType from "../actions/action-type";

const initialState = {
  loadingAuth: false,
  loadingHotels: false,
  loadingFavorites: false,
  loadingHotelReviews: false,
  loadingHotelDetails: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.LOADING_AUTH:
      return { ...state, loadingAuth: payload };

    case actionType.LOADING_HOTELS:
      return { ...state, loadingHotels: payload };

    case actionType.LOADING_FAVORITES:
      return { ...state, loadingFavorites: payload };

    case actionType.LOADING_REVIEWS_BY_HOTEL_ID:
      return { ...state, loadingHotelReviews: payload };

    case actionType.LOADING_HOTEL_BY_ID:
      return { ...state, loadingHotelDetails: payload };

    default:
      return state;
  }
};

export default reducer;
