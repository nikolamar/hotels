import * as actionType from "./action-type";
import hotelsApi from "../apis/hotels-api";
import { AxiosResponse, AxiosError } from "axios";
import { history } from "../../App";
import { purgeStore } from "./store";
import { loadingAuth } from "./loading";

export const authStateSignedIn = () => {
  return {
    type: actionType.AUTH_STATE_SIGNED_IN,
    payload: true,
  };
};

export const authStateSignIn = () => (dispatch) => {
  dispatch(purgeStore());
  dispatch({
    type: actionType.AUTH_STATE_SIGNED_IN,
    payload: false,
  });
};

export const authAuthenticateAccount = (formikActions, user) => (dispatch) => {
  dispatch(loadingAuth(true));
  hotelsApi
    .post("/api-token-auth/", user)
    .then((response: AxiosResponse) => {
      dispatch({
        type: actionType.AUTH_AUTHENTICATE_ACCOUNT,
        payload: response.data,
      });
      formikActions.resetForm();
      history.push("/hotels");
    })
    .catch((reason: AxiosError) => {
      if (reason.response?.status === 400) {
        Object.keys(reason.response.data).forEach((key, index) => {
          console.log(key, reason.response.data[key][0]);
          formikActions.setFieldError(
            key === "non_field_errors" ? "general" : key,
            reason.response.data[key][0]
          );
        });
      } else {
        formikActions.setFieldError("general", reason.message);
        console.log("error ", reason.message);
      }
    })
    .finally(() => {
      dispatch(loadingAuth(false));
    });
};

export const authCreateAccount = (formikActions, user) => (dispatch) => {
  dispatch(loadingAuth(true));
  hotelsApi
    .post("/register/", user)
    .then((response: AxiosResponse) => {
      dispatch({
        type: actionType.AUTH_CREATE_ACCOUNT,
        payload: response.data,
      });
      formikActions.resetForm();
      history.push("/signin");
    })
    .catch((reason: AxiosError) => {
      if (reason.response?.status === 400) {
        console.log(formikActions.setFieldError);
        Object.keys(reason.response.data).forEach((key, index) => {
          console.log(key, reason.response.data[key][0]);
          formikActions.setFieldError(key, reason.response.data[key][0], false);
        });
      } else {
        formikActions.setFieldError("general", reason.message);
        console.log("general ", reason.message);
      }
    })
    .finally(() => {
      dispatch(loadingAuth(false));
    });
};
