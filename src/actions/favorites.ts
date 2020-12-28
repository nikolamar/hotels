import * as actionType from "./action-type";
import hotelsApi from "../apis/hotels-api";
import { AxiosResponse, AxiosError } from "axios";
import { loadingFavorites } from "./loading";

export const favoritesList = () => (dispatch, getState) => {
  dispatch(loadingFavorites(true));
  hotelsApi
    .get("/favorites/", {
      headers: {
        Authorization: `token ${getState().auth.user?.token}`,
      },
    })
    .then((response: AxiosResponse) => {
      dispatch({
        type: actionType.FAVORITES_LIST,
        payload: response.data,
      });
    })
    .catch((reason: AxiosError) => {
      console.log("error ", reason.message);
    })
    .finally(() => {
      dispatch(loadingFavorites(false));
    });
};

export const favoriteAdd = (hotel) => {
  return {
    type: actionType.FAVORITE_ADD,
    payload: hotel,
  };
};

export const favoriteRemove = (id) => {
  return {
    type: actionType.FAVORITE_REMOVE,
    payload: id,
  };
};

export const favoritesListUpdate = (favorites) => {
  return {
    type: actionType.FAVORITES_LIST_UPDATE,
    payload: favorites,
  };
};

export const favoriteAddRemove = (favorite) => (dispatch, getState) => {
  // Copy favorites if request fail
  const prevStateFavorites = [...getState().favorites];

  if (favorite.is_favorite)
    dispatch(
      favoriteAdd(
        getState().hotels.filter((hot) => hot.id === favorite.hotel_id)[0]
      )
    );
  else dispatch(favoriteRemove(favorite.hotel_id));

  hotelsApi
    .post("/favorites/add_remove", favorite, {
      headers: {
        Authorization: `token ${getState().auth.user?.token}`,
      },
    })
    .then((response: AxiosResponse) => {
      console.log(response);
    })
    .catch((reason: AxiosError) => {
      dispatch(favoritesListUpdate(prevStateFavorites));
      console.log("error ", reason.message);
    });
};
