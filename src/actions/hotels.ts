import * as actionType from "./action-type";
import hotelsApi from "../apis/hotels-api";
import { AxiosResponse, AxiosError } from "axios";
import { loadingHotels } from "./loading";

export const hotelsList = () => (dispatch, getState) => {
  dispatch(loadingHotels(true));
  hotelsApi
    .get("/hotel_api/", {
      headers: {
        Authorization: `token ${getState().auth.user?.token}`,
      },
    })
    .then((response: AxiosResponse) => {
      dispatch({
        type: actionType.HOTELS_LIST,
        payload: response.data,
      });
    })
    .catch((reason: AxiosError) => {
      console.log("error ", reason.message);
    })
    .finally(() => {
      dispatch(loadingHotels(false));
    });
};

export const hotelAdd = (payload) => {
  return {
    type: actionType.HOTEL_ADD,
    payload,
  };
};

export const hotelRemove = (payload) => {
  return {
    type: actionType.HOTEL_REMOVE,
    payload,
  };
};
