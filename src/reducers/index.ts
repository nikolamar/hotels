import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import hotelsReducer from "./hotels-reducer";
import hotelReducer from "./hotel-reducer";
import favoritesReducer from "./favorites-reducer";
import loadingReducer from "./loading-reducer";
import reviewsReducer from "./reviews-reducer";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import config from "../config";

const persistConfig = {
  key: config.storageKey,
  storage: AsyncStorage,
  whiteList: ["auth", "hotels", "hotelDetails", "favorites"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  hotel: hotelReducer,
  hotels: hotelsReducer,
  favorites: favoritesReducer,
  loading: loadingReducer,
  reviews: reviewsReducer,
});

export default persistReducer(persistConfig, rootReducer);
