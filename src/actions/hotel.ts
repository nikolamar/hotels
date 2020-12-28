import * as actionType from "./action-type";
import hotelsApi from "../apis/hotels-api";
import { AxiosResponse, AxiosError } from "axios";
import { loadingHotelById } from "./loading";

export const hotelById = (id) => (dispatch, getState) => {
  dispatch(loadingHotelById(true));
  hotelsApi
    .get(`/hotel_api/${id}`, {
      headers: {
        Authorization: `token ${getState().auth.user?.token}`,
      },
    })
    .then((response: AxiosResponse) => {
      dispatch({
        type: actionType.HOTEL_BY_ID,
        payload: { details: response.data, hotel_id: id },
      });
    })
    .catch((reason: AxiosError) => {
      console.log("error ", reason.message);
    })
    .finally(() => {
      dispatch(loadingHotelById(false));
    });
};
