import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { connect } from 'react-redux';
import * as actions from "../actions";
import * as color from '../shared/color';
import { useHistory } from '../router';

const AppBar = ({ authUser, authStateSignIn, height }) => {

  const history = useHistory();
  
  return (
    <SafeAreaView>
      <View style={[styles.container, { height }]}>
        <TouchableOpacity onPress={() => history.push("/hotels")}>
          <Text style={styles.dashboardText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => history.push("/favorites")}>
          <Text style={styles.favoritesText}>Favorites</Text>
        </TouchableOpacity>
        <View style={{flex: 1}}/>
        <Text style={{color: "white"}}>{authUser?.email}</Text>
        <FontAwesome name="user" size={20} color="white" style={{margin: 15}}/>
        <TouchableOpacity onPress={authStateSignIn}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: color.primaryColor,
    flexDirection: "row",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 3,
      width: 0
    }
  },
  favoritesText: {
    fontWeight: `600`,
    color: "white",
    marginLeft: 20,
  },
  dashboardText: {
    fontWeight: `600`,
    color: "white",
    marginLeft: 20,
  },
  signOutText: {
    fontWeight: `600`,
    color: "white",
    marginRight: 20,
  },
});

const mapStateToProps = state => ({
  authUser: state.auth.user,
});

export default connect(
  mapStateToProps,
  { authStateSignIn: actions.authStateSignIn },
)(AppBar);