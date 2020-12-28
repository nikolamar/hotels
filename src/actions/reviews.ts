import * as actionType from "./action-type";
import hotelsApi from "../apis/hotels-api";
import { AxiosResponse, AxiosError } from "axios";
import { loadingReviewsByHotelId } from "./loading";

export const reviewsListByHotelId = (id) => (dispatch, getState) => {
  dispatch(loadingReviewsByHotelId(id));
  hotelsApi
    .get(`/hotel_api/get_hotel_reviews/${id}`, {
      headers: {
        Authorization: `token ${getState().auth.user?.token}`,
      },
    })
    .then((response: AxiosResponse) => {
      dispatch({
        type: actionType.REVIEWS_LIST_BY_HOTEL_ID,
        payload: { reviews: response.data, hotel_id: id },
      });
    })
    .catch((reason: AxiosError) => {
      console.log("error ", reason.message);
    })
    .finally(() => {
      dispatch(loadingReviewsByHotelId(false));
    });
};
