import * as actionType from "./action-type";

export const loadingHotelById = (payload) => {
  return {
    type: actionType.LOADING_HOTEL_BY_ID,
    payload,
  };
};

export const loadingHotels = (payload) => {
  return {
    type: actionType.LOADING_HOTELS,
    payload,
  };
};

export const loadingFavorites = (payload) => {
  return {
    type: actionType.LOADING_FAVORITES,
    payload,
  };
};

export const loadingAuth = (payload) => {
  return {
    type: actionType.LOADING_AUTH,
    payload,
  };
};

export const loadingReviewsByHotelId = (payload) => {
  return {
    type: actionType.LOADING_REVIEWS_BY_HOTEL_ID,
    payload,
  };
};
