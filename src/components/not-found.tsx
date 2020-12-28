import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useHistory } from "react-router-dom";

const NotFound = () => {

  const history = useHistory();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page not found</Text>
      <Text style={styles.text}>Oops! The page you are looking for has been removed or relocated</Text>
      <TouchableOpacity onPress={history.goBack}>
        <Text style={styles.textGoBack}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    maxWidth: 800,
    width: "100%",
  },
  title: {
    marginTop: 50,
    textAlign: "left",
    fontSize: 40,
    fontWeight: "600",
  },
  text: {
    marginTop: 50,
    textAlign: "left",
    fontSize: 20,
    fontWeight: "400",
  },
  textGoBack: {
    marginTop: 20,
    textAlign: "left",
    fontSize: 20,
    fontWeight: "600",
  }
}) as any;

export default NotFound;