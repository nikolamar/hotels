import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "../reducers";

const middlewares = [logger];

export const store = createStore(
  reducers,
  applyMiddleware(thunk, ...middlewares)
);

export const persistor = persistStore(store);
