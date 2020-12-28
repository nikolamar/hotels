import * as actionType from "./action-type";
import config from "../config";

export const purgeStore = () => {
  return {
    type: actionType.PURGE_STORE,
    key: config.storageKey,
  };
};
