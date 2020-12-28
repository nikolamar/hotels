import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { createBrowserHistory, createMemoryHistory } from 'history'
import Hotels from './src/containers/hotels';
import Favorites from './src/containers/favorites';
import Hotel from './src/containers/hotel';
import NotFound from "./src/components/not-found";
import AppBar from './src/containers/app-bar';
import { Router, Route, Switch } from "./src/router";
import PrivateRoute from './src/containers/private-route';
import SignIn from './src/containers/signin';
import SignUp from './src/containers/signup';
import { store, persistor } from './src/store';
import { PersistGate } from "redux-persist/integration/react";
import config from "./src/config";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';

export let history;

const isWeb = Platform.OS === "web";

if (isWeb) {
  history = createBrowserHistory();
} else {
  history = createMemoryHistory();
}

const App = () => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black,
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <AppBar height={config.appBarHeight} />
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute exact path="/hotels" component={Hotels} />
            <PrivateRoute exact path="/favorites" component={Favorites} />
            <PrivateRoute exact path="/hotel/:id" component={Hotel} />
            <PrivateRoute exact path={["/hotel/:id", "/hotel/:id/edit"]} component={Hotel} />
            <PrivateRoute component={NotFound} />
          </Switch>
        </Router>
      </PersistGate>
      <StatusBar style="auto" />
    </Provider>
  );
}

export default App;